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
                'email' => 'required|email|unique:organizations,email',
                'phone' => 'required',
            ]);
            $user = Auth::user();

            // Check if the user already has an organization
            if ($user->org_id !== null) {
                return response()->json([
                    'success' => false,
                    'message' => 'User already has an organization',
                ], 400);
            }

            // Create new Organization
            $organization = new Organization();

            $organization->name = $request->name;
            $organization->address = $request->address;
            $organization->country = $request->country;
            $organization->city = $request->city;
            $organization->email = $request->email;
            $organization->phone = $request->phone;
            $organization->user_id =$user->id;

            // Save organization to database
            $res = $organization->save();

            if ($res) {
                // Update org_id in User table for the authenticated user
               
                if ($user instanceof User) { // Check if Auth::user() returns User instance
                    $user->org_id = $organization->id; 
                    $user->single_user = false;
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

    public function createSingleUserAccount(Request $request)
    {
        try {
            $user = Auth::user();

            if ($user instanceof User) {
                if (!$user->single_user) {
                    $user->single_user = true;
                    $user->save();

                    return response()->json([
                        'success' => true,
                        'message' => 'User account marked as single user',
                        'user' => $user,
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'User account is already marked as single user',
                    ], 400);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
