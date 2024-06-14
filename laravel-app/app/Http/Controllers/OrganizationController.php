<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\User; // Import User model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrganizationController extends Controller
{
    public function createOrganization(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'address' => 'required',
                'country' => 'required',
                'city' => 'required',
                'email' => 'required',
                'phone' => 'required',
            ]);

            $organization = new Organization();

            $organization->name = $request->name;
            $organization->address = $request->address;
            $organization->country = $request->country;
            $organization->city = $request->city;
            $organization->email = $request->email;
            $organization->phone = $request->phone;

            $res = $organization->save();

            if ($res) {
                // Check if the user is authenticated
                // if (Auth::check()) {
                    // Create user with org_id
                    // $user = Auth::user();
                    
                    // $user->org_id = $organization->id; 

                    // $user->save();

                    return response(
                        [
                            'success' => true,
                            'message' => 'Organization created successfully',
                            'organization' => $organization,
                        ],
                        200
                    );
                // } else {
                //     // Handle case where user is not authenticated
                //     return response()->json([
                //         'success' => false,
                //         'message' => 'User must be logged in to perform this action'
                //     ], 401);
                // }
            } else {
                return response(
                    [
                        'success' => false,
                        'message' => 'Failed to register user'
                    ],
                    201
                );
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
