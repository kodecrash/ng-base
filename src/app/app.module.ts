import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NavComponent } from './shared/nav/nav.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { SharedBootstrapModule } from './shared-bootstrap.module';
import { NavService } from './services/nav.service';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './shared/modal/modal.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './shared/table/table.component';
import { AuthGuard } from './services/authguard.service';
import { HttpErrorInterceptor } from './services/http.interceptor';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SecureLayoutComponent } from './layouts/secure/secure-layout/secure-layout.component';
import { UnsecureLayoutComponent } from './layouts/unsecure/unsecure-layout/unsecure-layout.component';
import { environment } from '../environments/environment';
import {
  ModalModule,
  BsModalRef
} from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavComponent,
    SideNavComponent,
    LoginComponent,
    DatePickerComponent,
    CreateTicketComponent,
    TicketsComponent,
    ModalComponent,
    SpinnerComponent,
    TableComponent,
    PageNotFoundComponent,
    SecureLayoutComponent,
    UnsecureLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ModalModule.forRoot()

  ],
  entryComponents: [ModalComponent],
  providers: [ AuthGuard, NavService, ModalService, SpinnerService,
    BsModalRef,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
