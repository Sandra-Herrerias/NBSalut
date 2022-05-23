import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListVisitComponent } from './components/visit/list-visit/list-visit.component';
import { RegisterVisitComponent } from './components/visit/register-visit/register-visit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPatientsComponent } from './components/patients/list-patients/list-patients.component';
import { RegisterPatientComponent } from './components/patients/register-patient/register-patient.component';
import { QuarterlyReportComponent } from './components/invoices/quarterly-report/quarterly-report.component';
import { ListInvoicesComponent } from './components/invoices/list-invoices/list-invoices.component';
import { RegisterTreatmentComponent } from './components/treatments/register-treatment/register-treatment.component';
import { ListTreatmentsComponent } from './components/treatments/list-treatments/list-treatments.component';
import { DataTablesModule } from "angular-datatables";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';
import { EditPatientComponent } from './components/patients/edit-patient/edit-patient.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListworkersComponent } from './components/admin/listworkers/listworkers.component';
import { EditWorkersComponent } from './components/admin/edit-workers/edit-workers.component';
import { RegisterWorkerComponent } from './components/admin/register-worker/register-worker.component';
import { EditTreatmentComponent } from './components/treatments/edit-treatment/edit-treatment.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListVisitComponent,
    RegisterVisitComponent,
    ListPatientsComponent,
    RegisterPatientComponent,
    QuarterlyReportComponent,
    ListInvoicesComponent,
    RegisterTreatmentComponent,
    ListTreatmentsComponent,
    EditPatientComponent,
    ListworkersComponent,
    EditWorkersComponent,
    RegisterWorkerComponent,
    EditTreatmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
