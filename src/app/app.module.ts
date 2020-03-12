import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { StorageServiceModule } from 'ngx-webstorage-service';
import {
  NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION,
  PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule
} from 'ngx-ui-loader';
import { AuthGuard } from '../app/auth/auth.guard';
import { AuthService } from '../app/auth/auth.service';
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
import { HighlightSearch } from 'src/CustomPipes/HighlightSearch/HighlightSearch';
import { SafePipe } from 'src/CustomPipes/SafePipe/SafePipe';
import { ToasterModule } from 'angular2-toaster';
import { LoginComponent } from './login/login.component';
import { LocalStorageService } from 'src/services/LocalStorageService';
import { ActiveSwitchComponent } from './admin/active-switch/active-switch.component';
import { ActionButtonComponent } from './admin/action-button/action-button.component';
import { PasswordInputComponent } from './admin/password-input/password-input.component';
import { TokenInterceptorService } from './app-interceptor';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'purple',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.ballSpinClockwise, // foreground spinner type
  fgsColor: 'purple',
  "overlayColor": 'transparent',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
  pbColor: 'orange'
};


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
    SafePipe,
    LoginComponent,
    ActiveSwitchComponent,
    PasswordInputComponent,
    ActionButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgbModule,
    NgbAccordionModule,
    HttpClientModule,
    StorageServiceModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    // NgxUiLoaderModule, // import NgxUiLoaderModule
    // NgxUiLoaderHttpModule, // import NgxUiLoaderHttpModule. By default, it will show background loader.
    // NgxUiLoaderHttpModule.forRoot({ exclude: ['/api/auth'] });
    // // If you need to show foreground spinner, do as follow:
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    AngularEditorModule,
    AppRoutingModule,
    ToasterModule.forRoot()
  ],
  // providers: [NgxUiLoaderServices, LocalStorageService, AuthService, AuthGuard],  
  providers: [NgxUiLoaderServices, LocalStorageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ActiveSwitchComponent, PasswordInputComponent, ActionButtonComponent]
})
export class AppModule { }
