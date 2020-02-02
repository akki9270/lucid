import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule, NgbPanel, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientDetailsComponent } from './patients/view/tabs/details/patient-details.component';
import { NotesDetailsComponent } from './patients/view/tabs/notes/notes-details.component';
import { TimelineDetailsComponent } from './patients/view/tabs/timeline/timeline-details.component';
import { PatientViewComponent } from './patients/view/patient-view.component';
import { ServiceAccordionComponent } from './patients/view/tabs/details/components/service-accordion/service-accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    PatientsComponent,
    AnalyticsComponent,
    AdminComponent,
    PageNotFoundComponent,
    PatientDetailsComponent,
    NotesDetailsComponent,
    TimelineDetailsComponent,
    PatientViewComponent,
    ServiceAccordionComponent
  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    NgbModule,
    NgbAccordionModule,    
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
