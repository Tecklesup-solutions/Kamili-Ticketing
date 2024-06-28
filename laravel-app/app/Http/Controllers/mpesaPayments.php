<?php

namespace App\Http\Controllers;

use App\Models\mpesa;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class mpesaPayments extends Controller
{
    public function stkPush(Request $request)
    {
        // Variables from your request or configuration
        $businessShortCode = '174379';
        $passkey = '';  // Replace with your actual passkey
        $timestamp = date('YmdHis');
        $amount = '1';
        $phoneNumber = '254729736134';  // Replace with customer's phone number
        $callbackUrl = 'https://mydomain.com/pat';  // Replace with your callback URL
        $accountReference = 'Test';
        $transactionDesc = 'Test';

        // Construct the password (Base64 encoded)
        $password = base64_encode($businessShortCode . $passkey . $timestamp);

        // Prepare request body
        $postData = [
            "BusinessShortCode" => "174379",    
            "Password" => "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
            "Timestamp" =>"20160216165627",    
            "TransactionType" => "CustomerPayBillOnline",    
            "Amount" =>"1",    
            "PartyA" =>"254708374149",    
            "PartyB" =>"174379",    
            "PhoneNumber" =>"254710569802",    
            "CallBackURL" => "https://api.jandiko.com/api/handle_callback",     
            "AccountReference" =>"Test",    
            "TransactionDesc" =>"Test"
        ];

        // Convert data to JSON format
        $jsonPayload = json_encode($postData);

        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->generateAccessToken(), // Get access token
        ];

        // API endpoint
        $url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

        // Initialize cURL session
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonPayload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute cURL session
        $response = curl_exec($ch);

        // Check for errors
        if ($response === false) {
            $error = curl_error($ch);
            return response()->json(['error' => 'Curl error: ' . $error], 500);
        }

        // Close cURL session
        curl_close($ch);

        // Handle successful response
        $responseData = json_decode($response, true);
        return response()->json($responseData);
    }

    private function generateAccessToken()
    {
        $consumerKey = 'WTYGGltmtUwEMp8Aq39Ai1bcOH6YSnr9GT5ZHDmnR1KBMLvZ';
        $consumerSecret = '4nB11mmKyCrEDGQdPskd1sO4BkV2THGfQsBNtVPfR81JnYk4IgfpGwEIrgb9ivBi';

        // Encode consumer key and secret
        $credentials = base64_encode($consumerKey . ':' . $consumerSecret);

        // Prepare headers
        $headers = [
            'Authorization: Basic ' . $credentials,
            'Content-Type: application/json',
        ];

        // API endpoint for token generation
        $url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

        // Initialize cURL session
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute cURL session
        $response = curl_exec($ch);

        // Check for errors
        if ($response === false) {
            $error = curl_error($ch);
            throw new \Exception('Curl error: ' . $error);
        }

        // Close cURL session
        curl_close($ch);

        // Parse JSON response
        $responseData = json_decode($response, true);

        // Extract access token
        if (isset($responseData['access_token'])) {
            return $responseData['access_token'];
        } else {
            throw new \Exception('Access token not found in response');
        }
    }

    public function handleCallback(Request $request)
    {
        try {
            // Fetch the top-level callback data
            $callbackData = $request->json()->get('Body.stkCallback');

            // Now, access the nested CheckoutRequestID and CallbackMetadata
            $transaction = new Transaction();
            $transaction->org_id = 12;
            $transaction->TransID = $callbackData['CheckoutRequestID'];
            $transaction->TransAmount = $callbackData['CallbackMetadata']['Item'][0]['Value'];
            $transaction->TransactionStatus = $callbackData['ResultDesc'];

            // Save the transaction
            $transaction->save();

            // Respond to M-Pesa with a success message
            return response()->json(['resultDesc' => 'Callback received successfully'], 200);
        } catch (\Exception $e) {
            // Handle exceptions and errors
            // Respond with an error message
            return response()->json(['error' => 'Failed to process callback: '. $e->getMessage()], 500);
        }
    }

    public function createMpesaCredentials(Request $request){
        try {
            $user = Auth::user();
            $org_id = $user->org_id;

            // Find existing Mpesa credentials for the organization
            $mpesa = Mpesa::where('org_id', $org_id)->first();

            // If Mpesa credentials exist, update them; otherwise, create new ones
            if ($mpesa) {
                // Update existing credentials
                $mpesa->short_code = $request->short_code;
                $mpesa->partya = $request->partya;
                $mpesa->partyb = $request->partyb;
                $mpesa->phone_number = $request->phone_number;
                $mpesa->save();
                $message = 'Mpesa credentials updated successfully';
            } else {
                // Create new Mpesa credentials
                $mpesa = new Mpesa();
                $mpesa->org_id = $org_id;
                $mpesa->short_code = $request->short_code;
                $mpesa->partya = $request->partya;
                $mpesa->partyb = $request->partyb;
                $mpesa->phone_number = $request->phone_number;
                $mpesa->save();
                $message = 'Mpesa credentials created successfully';
            }

            return response()->json(['message' => $message, 'mpesa' => $mpesa], 200);
        } catch (\Exception $e) {
            // Handle exceptions and errors
            return response()->json(['error' => 'Failed to create Mpesa credentials: ' . $e->getMessage()], 500);
        }
    }
    
    public function fetchMpesaCredentials(){
        try {
            $user = Auth::user();
            $org_id = $user->org_id;
    
            // Fetch Mpesa credentials for the organization
            $mpesa = mpesa::where('org_id', $org_id)->firstOrFail();
    
            return response()->json(['mpesa' => $mpesa], 200);
        } catch (\Exception $e) {
            // Handle exceptions and errors
            return response()->json(['error' => 'Failed to fetch Mpesa credentials: ' . $e->getMessage()], 500);
        }
    }
    
}
