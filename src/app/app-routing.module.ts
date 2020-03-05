import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientViewComponent } from './patients/view/patient-view.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'login',    
    component: LoginComponent
  },
  {
    path: 'patients',
    component: PatientsComponent,    
  },
  {
    path: 'patients/:patientId/view',
    component: PatientViewComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  { 
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
