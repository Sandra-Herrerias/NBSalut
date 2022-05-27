<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\AttachedController;

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
Route::post('delTreatment', [TreatmentController::class, 'delTreatment']);
Route::post('modTreatment', [TreatmentController::class, 'modTreatment']);
Route::post('statusTreatment', [TreatmentController::class, 'statusTreatment']);
Route::post('modTreatment', [TreatmentController::class, 'modTreatment']);


// Visits Routes
Route::get('getVisits', [VisitController::class, 'getVisits']);
Route::post('getVisitsPatient', [VisitController::class, 'getVisitsPatient']);
Route::post('insertVisit', [VisitController::class, 'insertVisit']);
// Route::delete('delVisit', [VisitController::class, 'delVisit']);
Route::post('filed', [VisitController::class, 'fileDownload']);
Route::delete('delVisit', [VisitController::class, 'delVisit']);
Route::get('getVisitsList', [VisitController::class, 'getVisitsList']);
Route::get('getTotalVisitsBySpecialist', [VisitController::class, 'getTotalVisitsBySpecialist']);
Route::get('getLastsVistsBySpecialist', [VisitController::class, 'getLastsVistsBySpecialist']);

// Invoice Routes
Route::get('getInvoices', [InvoiceController::class, 'getInvoices']);
Route::get('getInvoice', [InvoiceController::class, 'getInvoice']);
Route::get('getTotalInvoicesBySpecialist', [InvoiceController::class, 'getTotalInvoicesBySpecialist']);
Route::get('generateInvoice', [InvoiceController::class, 'generateInvoice']);
Route::post('sentInvoicesChecked', [InvoiceController::class, 'sentInvoicesChecked']);
Route::get('getLastsInvoicesBySpecialist', [InvoiceController::class, 'getLastsInvoicesBySpecialist']);

// Patients Routes
Route::post('checkPatientDni', [UserController::class, 'checkPatientDni']);
Route::post('checkPatientName', [UserController::class, 'checkPatientName']);
Route::post('addPatient', [UserController::class, 'addPatient']);
Route::get('getPatients', [UserController::class, 'getPatients']);
Route::get('getMaxClinicalLog', [UserController::class, 'getMaxClinicalLog']);
Route::get('getTotalPatients', [UserController::class, 'getTotalPatients']);
Route::get('getLastsPatients', [UserController::class, 'getLastsPatients']);

// Attached Routes
Route::post('upload', [AttachedController::class, 'upload']);
Route::post('listFiles', [AttachedController::class, 'listFiles']);

Route::group(['middleware' => ['cors']], function () {
    //Rutas a las que se permitirá acceso
    Route::delete('deleteUser', [UserController::class, 'deleteUser']);
    Route::post('updateUser', [UserController::class, 'updateUser']);
    Route::post('deactivateUser', [UserController::class, 'deactivateUser']);
});


//Workers Routes
Route::get('getWorkers', [UserController::class, 'getWorkers']);
Route::post('addWorker', [UserController::class, 'addWorker']);
