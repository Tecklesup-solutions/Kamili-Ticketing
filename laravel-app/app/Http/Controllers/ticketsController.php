<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\Tickets;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ticketsController extends Controller
{
    public function createTicket(Request $request)
    {
        try {
            // Validate incoming request data
            $validatedData = $request->validate([
                'event_id' => 'required|string',
                'type' => 'required|string',
                'no_people' => 'required|integer|min:1',
                'first_name' =>'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string'
            ]);

            // Check available tickets for the event
            $availableTickets = Tickets::where('event_id', $validatedData['event_id'])
                ->where('purchased', false)
                ->limit($validatedData['no_people'])
                ->get();

            if ($availableTickets->count() < $validatedData['no_people']) {
                return response()->json([
                    'status' => false,
                    'message' => 'Not enough tickets available for purchase'
                ], 400); // Bad Request
            }

            // Update ticket details and mark as sold
            foreach ($availableTickets as $ticket) {
                $ticket->type = $validatedData['type'];
                $ticket->validated = true;
                $ticket->price = 50; 
                $ticket->first_name = $validatedData['first_name'];
                $ticket->last_name = $validatedData['last_name'];
                $ticket->email = $validatedData['email'];
                $ticket->save();
            }

            return response()->json([
                'status' => true,
                'message' => 'Tickets purchased successfully',
                'tickets' => $availableTickets
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500); // Internal Server Error
        }
    }

    public function validateTicket(Request $request)
    {
        try {
            // Validate incoming request data
            $validatedData = $request->validate([
                'qr_code' => 'required|string'
            ]);

            // Find the ticket by QR code
            $ticket = Tickets::where('qr_code', $validatedData['qr_code'])->first();

            if (!$ticket) {
                return response()->json([
                    'status' => false,
                    'message' => 'Ticket not found'
                ], 404); // Not Found
            }

            // Check if the ticket has already been validated
            if ($ticket->validated) {
                return response()->json([
                    'status' => false,
                    'message' => 'Ticket has already been validated'
                ], 400); // Bad Request
            }

            // Mark the ticket as validated (purchased)
            $ticket->validated = true;
            $ticket->save();

            return response()->json([
                'status' => true,
                'message' => 'Ticket validated successfully',
                'ticket' => $ticket
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500); // Internal Server Error
        }
    }

    public function BuyTicket(Request $request, $id) {
        try {
            // Step 1: Check if the requested event exists
            $event = Events::findOrFail($id);

            $event_id= $event->event_id;
            $event_image = asset('images/' . $event->image);

            // Step 2: Determine the number of tickets to purchase (assuming it's in the request body)
            $numberOfTickets = $request->input('noTickets');

            // Step 3: Check if the required number of tickets is available for purchase
            $availableTickets = Tickets::where('event_id', $event_id)
                ->where('purchased', false)
                ->limit($numberOfTickets)
                ->get();

            if ($availableTickets->count() < $numberOfTickets) {
                return response()->json([
                    'status' => false,
                    'message' => 'Not enough tickets available for purchase',
                    'tickets'=>$availableTickets->count()
                ], 400); // Bad Request
            }

            // Step 4: Create ticket entries in the database for the specified event
            $purchasedTickets = [];
            foreach ($availableTickets as $ticket) {
                $ticket->type = 'General Admission';
                $ticket->first_name = $request->input('firstName');
                $ticket->last_name = $request->input('lastName');
                $ticket->email = $request->input('email');
                $ticket->qr_code = $ticket->qr_code;
                $ticket->purchased = true;
                $ticket->save();
                $purchasedTickets[] = $ticket;
            }
                // $pdf = pdf::loadView('ticket', ['tickets' => $purchasedTickets]);
                // $pdfData = $pdf->output();
                // $base64EncodedPdf = base64_encode($pdfData);
             
                return response()->json([
                    'status' => true,
                    'message' => 'Tickets purchased successfully',
                    'tickets' => $purchasedTickets,
                    'event_image' => $event_image, 
                    'pdf' => $purchasedTickets 
                ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500); // Internal Server Error
        }
    }
}
