<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\eventsController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\ticketsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('register', [AuthenticationController::class,'register']);

Route::post('login', [AuthenticationController::class,'login']);

Route::post('createOrganization', [OrganizationController::class,'createOrganization'])->middleware('auth:sanctum');

Route::get('verify/{id}', [AuthenticationController::class,'verify']);


Route::post('create_event', [eventsController::class,'createEvent'])->middleware('auth:sanctum');

Route::get('get_events', [eventsController::class, 'fetchEvents']);


Route::get('fetchSingleEvent/{id}', [eventsController::class,'fetchSingleEvent']);

Route::get('fetchEventUsers/{id}', [eventsController::class,'fetchEventUsers']);


Route::post('buyTicket/{id}',[ticketsController::class,'buyTicket']);

Route::post('create_ticket', [ticketsController::class, 'createTicket']);

Route::post('validate_ticket', [ticketsController::class,'validateTicket']);

// Device routes

Route::post('create_device', [DeviceController::class, 'createDevice'])->middleware('auth:sanctum');

Route::get('fetch_devices', [DeviceController::class, 'fetchDevices'])->middleware('auth:sanctum');

Route::post('delete_devices', [DeviceController::class, 'fetchDevices'])->middleware('auth:sanctum');