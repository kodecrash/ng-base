import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AuthGuard } from './services/authguard.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SecureLayoutComponent } from './layouts/secure/secure-layout/secure-layout.component';
import { UnsecureLayoutComponent } from './layouts/unsecure/unsecure-layout/unsecure-layout.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { 
    path: '',
    component: UnsecureLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent, pathMatch: 'full', data: { title: 'Ng Base | Login'} },
      // {path: '**', component: PageNotFoundComponent}
    ]
  },

  { 
    path: '',
    component: SecureLayoutComponent,
    children: [
      {path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'Dashboard'}  },
      {path: 'about', component: AboutComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'About'} },
      {path: 'createticket', component: CreateTicketComponent, pathMatch: 'full', canActivate: [AuthGuard], 
      canDeactivate: [CanDeactivateGuard],data: { title: 'Create Ticket'} },
      {path: 'tickets', component: TicketsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'All Tickets'} }
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
