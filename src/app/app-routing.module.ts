import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientViewComponent } from './patients/view/patient-view.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',    
    component: LoginComponent
  },
  {
    path: 'patients',
    component: PatientsComponent,    
    // canActivate: [AuthGuard]
  },
  {
    path: 'patients/:patientId/view',
    component: PatientViewComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    // canActivate: [AuthGuard]
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
