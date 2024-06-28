<?php

namespace App\Http\Controllers;

use App\Models\queries;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QueryController extends Controller
{
    public function fetchQuery()
    {
        try {
            // Example: Fetch all queries (you can modify this as per your logic)
            $queries = Queries::with(['user', 'organization'])->get();

            return response()->json([
                'status' => true,
                'data' => $queries
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function createQuery(Request $request)
    {
        try {
            // Validate incoming request
            $validatedData = $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
            ]);

            $user = Auth::user();
            $org_id = $user->org_id;

            // Create new query
            $query = new queries();
            $query->title = $validatedData['title'];
            $query->description = $validatedData['description'];
            $query->org_id = $org_id; 
            $query->user_id = $user->id;
            $query->save();

            return response()->json([
                'status' => true,
                'data' => $query,
                'message' => 'Query created successfully'
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
