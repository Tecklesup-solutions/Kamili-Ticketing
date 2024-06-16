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

            // Create new Organization
            $organization = new Organization();

            $organization->name = $request->name;
            $organization->address = $request->address;
            $organization->country = $request->country;
            $organization->city = $request->city;
            $organization->email = $request->email;
            $organization->phone = $request->phone;

            // Save organization to database
            $res = $organization->save();

            if ($res) {
                // Update org_id in User table for the authenticated user
                $user = Auth::user();
                if ($user instanceof User) { // Check if Auth::user() returns User instance
                    $user->org_id = $organization->id; // Assuming organization id is used as org_id
                    $user->save();

                    return response([
                        'success' => true,
                        'message' => 'Organization created successfully',
                        'organization' => $organization,
                    ], 200);
                } else {
                    return response([
                        'success' => false,
                        'message' => 'User not authenticated',
                    ], 401);
                }
            } else {
                return response([
                    'success' => false,
                    'message' => 'Failed to create organization',
                ], 201);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
