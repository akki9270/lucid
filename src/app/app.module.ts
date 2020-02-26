import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION,
  PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUiLoaderServices } from './ngx-ui-loader.service'
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
import { DatepickerRangePopupComponent } from '../components/datepicker-range-popup/datepicker-range-popup.component';
import { HighlightSearch, SafeHtmlPipe } from 'src/CustomPipes/HighlightSearch/HighlightSearch';

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
    ServiceAccordionComponent,
    DatepickerRangePopupComponent,
    HighlightSearch,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SmartTableModule,
    NgbModule,
    NgbAccordionModule,
    HttpClientModule,
    NgxUiLoaderModule, // import NgxUiLoaderModule
    NgxUiLoaderHttpModule, // import NgxUiLoaderHttpModule. By default, it will show background loader.
    // If you need to show foreground spinner, do as follow:
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    AngularEditorModule,
    AppRoutingModule
  ],
  providers: [NgxUiLoaderServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
