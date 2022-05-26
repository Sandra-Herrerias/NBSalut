<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\InvoiceController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// User Routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [UserController::class, 'login']);
Route::get('getUsers', [UserController::class, 'getUsers']);
Route::get('getAuthUser', [UserController::class, 'getAuthUser']);

// Treatment Routes
Route::get('getTreatments', [TreatmentController::class, 'getTreatments']);
Route::post('getTreatment', [TreatmentController::class, 'getTreatment']);
Route::post('addTreatment', [TreatmentController::class, 'addTreatment']);
Route::delete('delTreatment', [TreatmentController::class, 'delTreatment']);
Route::post('modTreatment', [TreatmentController::class, 'modTreatment']);
Route::put('statusTreatment', [TreatmentController::class, 'statusTreatment']);
Route::put('modTreatment', [TreatmentController::class, 'modTreatment']);


// Visits Routes
Route::get('getVisits', [VisitController::class, 'getVisits']);
Route::post('getVisitsPatient', [VisitController::class, 'getVisitsPatient']);
Route::post('insertVisit', [VisitController::class, 'insertVisit']);
Route::post('upload', [VisitController::class, 'upload']);
Route::post('files', [VisitController::class, 'files']);
Route::post('filed', [VisitController::class, 'fileDownload']);
Route::delete('delVisit', [VisitController::class, 'delVisit']);
Route::get('getVisitsList', [VisitController::class, 'getVisitsList']);

// Invoice Routes
Route::get('getInvoices', [InvoiceController::class, 'getInvoices']);
Route::get('generateInvoice', [InvoiceController::class, 'generateInvoice']);
Route::get('getTotalInvoices', [InvoiceController::class, 'getTotalInvoices']);
Route::put('sentInvoicesChecked', [InvoiceController::class, 'sentInvoicesChecked']);

// Patients Routes
Route::post('checkPatientDni', [UserController::class, 'checkPatientDni']);
Route::post('checkPatientName', [UserController::class, 'checkPatientName']);
Route::post('addPatient', [UserController::class, 'addPatient']);
Route::get('getPatients', [UserController::class, 'getPatients']);
Route::get('getMaxClinicalLog', [UserController::class, 'getMaxClinicalLog']);


Route::group(['middleware' => ['cors']], function () {
    //Rutas a las que se permitirá acceso
    Route::delete('deleteUser', [UserController::class, 'deleteUser']);
    Route::put('updateUser', [UserController::class, 'updateUser']);
    Route::put('deactivateUser', [UserController::class, 'deactivateUser']);

});


//Workers Routes
Route::get('getWorkers', [UserController::class, 'getWorkers']);
Route::post('addWorker', [UserController::class, 'addWorker']);