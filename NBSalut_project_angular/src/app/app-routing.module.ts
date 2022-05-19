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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'regvisit',
    component: RegisterVisitComponent
  },
  {
    path: 'listvisits',
    component: ListVisitComponent
  },
  {
    path: 'regpatient',
    component: RegisterPatientComponent
  },
  {
    path: 'listpatient', component: ListPatientsComponent,
    
  },
  {
    path: 'editpatient',
    component: EditPatientComponent
  },
  {
    path: 'quarterlyreport',
    component: QuarterlyReportComponent
  },
  {
    path: 'listinvoices',
    component: ListInvoicesComponent
  },
  {
    path: 'regtreatment',
    component: RegisterTreatmentComponent
  },
  {
    path: 'listtreatments',
    component: ListTreatmentsComponent
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
