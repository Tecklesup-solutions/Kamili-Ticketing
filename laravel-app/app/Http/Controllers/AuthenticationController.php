<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        try{
            $request->validate([
                'email'=>'required',
                'password'=>'required'
            ]);
            $email = $request['email'];
            $user = User::where('email', $email)->firstOrFail();

            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                if ($user) {
                    $token = $user->createToken('UserAuthentication')->plainTextToken;
                    return response([
                        'success' => true,
                        'message' => 'User logged in successfully',
                        'token' => $token
                    ], 200);
                } else {
                    Auth::logout(); // Log out the user if email is not verified
                    return response([
                        'success' => false,
                        'message' => 'Please verify your email before logging in.'
                    ], 401);
                }
            }
            
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
        
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'password' => 'required',
                'phoneNumber' => 'required',
                'email' => 'required|unique:users,email', // Ensure email uniqueness
            ]);
    
            $user = new User();
    
            $user->password = Hash::make($request->password);
            $user->firstName = $request->firstName;
            $user->lastName = $request->lastName;
            $user->phoneNumber = $request->phoneNumber;
            $user->email = $request->email;
    
            $res = $user->save();
    
            if ($res) {
                // Send email verification notification
                $tokenable_id = $user->id;

                Mail::html(view('emails', ['token' => $tokenable_id])->render(), function ($m) use ($user) {
                    $m->from('hello@app.com', 'ticketing');
                    $m->to($user->email, $user->name)->subject('Welcome to Ticketing');
                });
    
                return response()->json([
                    'success' => true,
                    'message' => 'User registered successfully. Please verify your email.',
                    'user' => $user
                ], 200);
            } else {
                return response([
                    'success' => false,
                    'message' => 'Failed to register user'
                ], 201);
            }
        } catch (\Illuminate\Database\QueryException $exception) {
            // Check if the error is due to duplicate email
            if ($exception->errorInfo[1] === 1062) {
                return response()->json([
                    'status' => false,
                    'message' => 'User already exists'
                ], 400);
            }
    
            // Other database-related errors
            return response()->json([
                'status' => false,
                'message' => 'Database error'
            ], 500);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

   

    public function logout(Request $request){
        try {
            // Revoking the current user's token
            $request->user()->currentAccessToken()->delete();
    
            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function createOrganization(Request $request){
        try{

        }catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function verify( $id)
    {
        try {
            $user = User::findOrFail($id);

            if ($user->verify) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email already verified'
                ], 400);
            }

            $user->verify = true;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Email verified successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


}
