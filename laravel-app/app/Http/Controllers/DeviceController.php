<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\Events;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class DeviceController extends Controller
{
    public function createDevice(Request $request)
    {
        try {
            $OrgId = Auth::user()->org_id;

            // Check if a device with the same name already exists for this organization
            $existingDevice = Devices::where('org_id', $OrgId)
                                    ->where('device_name', $request->device_name)
                                    ->first();

            if ($existingDevice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Device with this name already exists for this organization'
                ], 400);
            }

            // Create new device
            $device = new Devices();

            $device->org_id = $OrgId;
            $device->device_name = $request->device_name;
            $device->location = $request->device_location;
            $device->pin = $request->device_pin;
            $device->event = $request->event;

            $res = $device->save();

            if ($res) {
                return response([
                    'success' => true,
                    'message' => 'Device created successfully'
                ], 200);
            } else {
                return response([
                    'success' => false,
                    'message' => 'Failed to create device'
                ], 201);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function fetchMobileDevice(Request $request)
    {
        try {
            $api_token = $request->api_token;

            if (!$api_token) {
                return response()->json([
                    'success' => false,
                    'message' => 'API token not provided in request body'
                ], 401);
            }

            $device = Devices::where('api_token', $api_token)->firstOrFail();

            $orgId = $device->org_id;
            $event = $device->event;

            $eventData = Events::where('org_id', $orgId)
                ->where('name', $event)
                ->firstOrFail();

            $responseData = [
                'event_name' => $eventData->name,
                'location' => $device->location,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Device and event details fetched successfully',
                'data' => $responseData
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function fetchDevices(Request $request)
    {
        try {
            $OrgId = Auth::user()->org_id;

            $devices = Devices::where('org_id', $OrgId)->get();

            return response([
                'success' => true,
                'message' => 'Devices fetched successfully',
                'devices' => $devices
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteDevice(Request $request)
    {
        try {
            $OrgId = Auth::user()->org_id;
            $deviceId = $request->device_id;

            $device = Devices::where('id', $deviceId)
                ->where('org_id', $OrgId)
                ->firstOrFail();

            $device->delete();

            return response()->json([
                'success' => true,
                'message' => 'Device deleted successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
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
                'org_email'=>'required|email'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 422);
            }
            $organization = Organization::where('email', $request->org_email)->firstOrFail();

            $org_id = $organization->id;

            $device = Devices::where('device_name', $request->device_name)
                ->where('pin', $request->pin)->where('org_id', $org_id)
                ->first();

            if (!$device) {
                return response()->json([
                    'success' => false,
                    'message' => 'Device authentication failed',
                ], 401);
            }

            // Generate a new unique token for this device
            $token = Str::random(60);
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


    public function logoutDevice(Request $request)
    {
        try {
            $api_token = $request->api_token;

            if (!$api_token) {
                return response()->json([
                    'success' => false,
                    'message' => 'API token not provided in request body'
                ], 401);
            }

            $device = Devices::where('api_token', $api_token)->firstOrFail();

            $device->api_token = null;
            $device->save();

            return response()->json([
                'success' => true,
                'message' => 'Device logged out successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
