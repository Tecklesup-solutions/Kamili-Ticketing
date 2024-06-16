<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class DeviceController extends Controller
{
    
    public function createDevice(Request $request){
       try{
        $OrgId = Auth::user()->org_id;

        $device = new Devices();

        $device->org_id = $OrgId;
        $device->device_name = $request->device_name;
        $device->location = $request->device_location;
        $device->pin = $request->device_pin;
        

        $res = $device->save();

        if($res){
            return response(
                [
                    'success' => true,
                    'message' => 'Device Created successfully'
                ],
                200
            );

        }else{
            return response(
                [
                    'success' => false,
                    'message' => 'Failed to create device'
                ],
                201
            );

        }
        

       }catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 500);
    }
    }

    public function fetchDevices(Request $request){
        try{
         $OrgId = Auth::user()->org_id;
            
         $device = Devices::where('org_id', $OrgId)->get();

         return response(
            [
                'success' => true,
                'message' => 'Devices fetched successfully',
                'devices' => $device
            ],
            200
        );
         
 
        }catch (\Throwable $th) {
         return response()->json([
             'status' => false,
             'message' => $th->getMessage()
         ], 500);
     }
     }

     public function deleteDevice(Request $request){
        try{
         $OrgId = Auth::user()->org_id;
 
         
 
        }catch (\Throwable $th) {
         return response()->json([
             'status' => false,
             'message' => $th->getMessage()
         ], 500);
     }
     }

     public function loginDevice(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'device_name' => 'required|string',
                'pin' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Authenticate device based on device name and pin
            $device = Devices::where('device_name', $request->device_name)
                             ->where('pin', $request->pin)
                             ->first();

            if (!$device) {
                return response()->json([
                    'success' => false,
                    'message' => 'Device authentication failed',
                ], 401);
            }

            // Generate a unique token for the device
            $token = Str::random(60); // Generate a random token
            $device->api_token = $token;
            $device->save();

            return response()->json([
                'success' => true,
                'message' => 'Device logged in successfully',
                'token' => $token,
                'device' => $device,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
