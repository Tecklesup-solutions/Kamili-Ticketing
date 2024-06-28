<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\eventsController;
use App\Http\Controllers\mpesaPayments;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\QueryController;
use App\Http\Controllers\ticketsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('register', [AuthenticationController::class,'register']);

Route::post('login', [AuthenticationController::class,'login']);

Route::post('logout', [AuthenticationController::class,'logout'])->middleware('auth:sanctum');

Route::get('fetch_user', [AuthenticationController::class,'fetchUser'])->middleware('auth:sanctum');

Route::post('createOrganization', [OrganizationController::class,'createOrganization'])->middleware('auth:sanctum');

Route::post('create_single_account', [OrganizationController::class, 'createSingleUserAccount'])->middleware('auth:sanctum');

Route::get('verify/{id}', [AuthenticationController::class,'verify']);


Route::post('create_event', [eventsController::class,'createEvent'])->middleware('auth:sanctum');

Route::get('get_events', [eventsController::class, 'fetchEvents']);

Route::get('get_org_events', [eventsController::class,'fetchOrgEvents'])->middleware('auth:sanctum');

Route::delete('delete_event/{id}', [EventsController::class, 'deleteEvent'])->middleware('auth:sanctum'); 


Route::get('fetchSingleEvent/{id}', [eventsController::class,'fetchSingleEvent']);

Route::get('fetchEventUsers/{id}', [eventsController::class,'fetchEventUsers']);


Route::post('buyTicket/{id}',[ticketsController::class,'buyTicket']);

// Route::post('create_ticket', [ticketsController::class, 'createTicket']);

Route::post('validate_ticket', [ticketsController::class,'validateTicket']);

// Device routes

Route::post('create_device', [DeviceController::class, 'createDevice'])->middleware('auth:sanctum');

Route::get('fetch_devices', [DeviceController::class, 'fetchDevices'])->middleware('auth:sanctum');

Route::post('delete_devices', [DeviceController::class, 'fetchDevices'])->middleware('auth:sanctum');

Route::post('login_device', [DeviceController::class, 'loginDevice']);

Route::post('logout_device',[DeviceController::class,'logoutDevice']);

Route::post('fetch_single_device', [DeviceController::class, 'fetchMobileDevice']);


Route::post('create_mpesa_creds', [mpesaPayments::class, 'createMpesaCredentials'])->middleware('auth:sanctum');

Route::get('fetch_mpesa_creds', [mpesaPayments::class, 'fetchMpesaCredentials'])->middleware('auth:sanctum');

Route::post('create_query',[QueryController::class, 'createQuery'])->middleware('auth:sanctum');

Route::get('fetch_queries',[QueryController::class, 'fetchQuery'])->middleware('auth:sanctum');

//payment routes
Route::post('mpesa_pay', [mpesaPayments::class, 'stkPush']);

Route::post('handle_callback', [mpesaPayments::class, 'handleCallback']);