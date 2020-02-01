import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
// import { AdminComponent } from './admin/admin.component';
// import { AnalyticsComponent } from './analytics/analytics.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'patients',
    component: PatientsComponent  
  },
  // {
  //   path: 'admin',
  //   component: AdminComponent
  // },
  // {
  //   path: 'analytics',
  //   component: AnalyticsComponent
  // },
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
