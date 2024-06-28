<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\Events;
use App\Models\Tickets;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;

class ticketsController extends Controller
{
   

    public function validateTicket(Request $request)
    {
        try {
            // Validate incoming request data
            $validatedData = $request->validate([
                'qr_code' => 'required|string'
            ]);

            $api_token = $request->api_token;

            $device = Devices::where('api_token', $api_token)->firstOrFail();

            $event = $device->event;

            $eventData = Events::where('name', $event)->firstOrFail();

            // $eventId = $eventData->id;

            // Find the ticket by QR code
            $ticket = Tickets::where('qr_code', $validatedData['qr_code'])->firstOrFail();

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

    public function BuyTicket(Request $request, $id)
    {
        try {
            // Step 1: Check if the requested event exists
            $event = Events::findOrFail($id);

            $event_id = $event->event_id;
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
                    'tickets' => $availableTickets->count()
                ], 400); // Bad Request
            }

            // Step 4: Create ticket entries in the database for the specified event
            $purchasedTickets = [];
            foreach ($availableTickets as $ticket) {
                $ticket->type = 'General Admission';
                $ticket->first_name = $request->input('firstName');
                $ticket->last_name = $request->input('lastName');
                $ticket->email = $request->input('email');

                
                // Mark ticket as purchased and save
                $ticket->purchased = true;
                $ticket->save();
                $purchasedTickets[] = $ticket;
            }

            // Generate PDF for purchased tickets
            $pdf = PDF::loadView('ticket', ['tickets' => $purchasedTickets]);
            $pdfData = $pdf->output();
            $base64EncodedPdf = base64_encode($pdfData);
            $pdfFileName = 'tickets.pdf'; 
            $pdfPath = storage_path('app/' . $pdfFileName);
            file_put_contents($pdfPath, $pdfData);

            // Step 6: Email the PDF tickets to the user
            Mail::send([], [], function ($message) use ($request, $pdfPath, $pdfFileName, $event) {
                $message->to($request->input('email'))
                        ->subject('Your Purchased Tickets for ' . $event->name)
                        ->attach($pdfPath, [
                            'as' => $pdfFileName,
                            'mime' => 'application/pdf',
                        ]);
            });

            return response()->json([
                'status' => true,
                'message' => 'Tickets purchased successfully',
                'tickets' => $purchasedTickets,
                'event_image' => $event_image,
                'pdf' => $base64EncodedPdf
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500); // Internal Server Error
        }
    }

}
