import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterVisitComponent } from './components/visit/register-visit/register-visit.component';
import { ListVisitComponent } from './components/visit/list-visit/list-visit.component';
import { ListPatientsComponent } from './components/patients/list-patients/list-patients.component';
import { RegisterPatientComponent } from './components/patients/register-patient/register-patient.component';
import { QuarterlyReportComponent } from './components/invoices/quarterly-report/quarterly-report.component';
import { ListInvoicesComponent } from './components/invoices/list-invoices/list-invoices.component';
import { ListTreatmentsComponent } from './components/treatments/list-treatments/list-treatments.component';
import { RegisterTreatmentComponent } from './components/treatments/register-treatment/register-treatment.component';
import { EditPatientComponent } from './components/patients/edit-patient/edit-patient.component';
import { ListworkersComponent } from './components/admin/listworkers/listworkers.component';
import { EditWorkersComponent } from './components/admin/edit-workers/edit-workers.component';
import { RegisterWorkerComponent } from './components/admin/register-worker/register-worker.component';
import { EditTreatmentComponent } from './components/treatments/edit-treatment/edit-treatment.component';
import { GuardGuard } from './auth/guard.guard';
import { TemplateInvoiceComponent } from './components/invoices/template-invoice/template-invoice.component';
import { TemplateReceiptComponent } from './components/invoices/template-receipt/template-receipt.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [GuardGuard],
    component: HomeComponent,
  },
  {
    path: 'login',
    // canActivate: [GuardGuard],
    component: LoginComponent,
  },
  {
    path: 'regvisit',
    canActivate: [GuardGuard],
    component: RegisterVisitComponent,
  },
  {
    path: 'listvisits',
    canActivate: [GuardGuard],
    component: ListVisitComponent,
  },
  {
    path: 'regpatient',
    canActivate: [GuardGuard],
    component: RegisterPatientComponent,

  },
  {
    path: 'listpatient',
    canActivate: [GuardGuard],
    component: ListPatientsComponent,
  },
  {
    path: 'editpatient',
    canActivate: [GuardGuard],
    component: EditPatientComponent,

  },
  {
    path: 'quarterlyreport',
    canActivate: [GuardGuard],
    component: QuarterlyReportComponent,

  },
  {
    path: 'invoice/:id',
    canActivate: [GuardGuard],
    component: TemplateInvoiceComponent,
  },
  {
    path: 'receipt/:id',
    canActivate: [GuardGuard],
    component: TemplateReceiptComponent,
  },
  {
    path: 'listinvoices',
    canActivate: [GuardGuard],
    component: ListInvoicesComponent,

  },
  {
    path: 'regtreatment',
    canActivate: [GuardGuard],
    component: RegisterTreatmentComponent,

  },
  {
    path: 'listtreatments',
    component: ListTreatmentsComponent,
    canActivate: [GuardGuard]
  }, {
    path: 'listworkers',
    component: ListworkersComponent,
    canActivate: [GuardGuard]
  }, {
    path: 'modifytreat/:id',
    component: EditTreatmentComponent,
    canActivate: [GuardGuard]
  }, {
    path: 'editworker',
    component: EditWorkersComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'regspecialist',
    component: RegisterWorkerComponent,
    canActivate: [GuardGuard]
  },
  {//default
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
