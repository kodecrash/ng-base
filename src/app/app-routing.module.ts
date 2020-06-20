import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AuthGuard } from './services/authguard.service';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'about', component: AboutComponent, pathMatch: 'full'},
  {path: 'createticket', component: CreateTicketComponent, pathMatch: 'full'},
  {path: 'tickets', component: TicketsComponent, pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
