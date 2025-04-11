import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WhoAreWe1Component } from './pages/who-are-we1/who-are-we1.component';
import { WhoAreWe2Component } from './pages/who-are-we2/who-are-we2.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { ListcontactComponent } from './listcontact/listcontact.component';
import { AjoutercontactComponent } from './ajoutercontact/ajoutercontact.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent },
  {path:'who1',component:WhoAreWe1Component},
  {path:'who2',component:WhoAreWe2Component},
  {path:'listEmploye',component:ListeEmployesComponent},
  {path:'listcontact',component:ListcontactComponent},
  {path:'ajoutercontact',component:AjoutercontactComponent},

  { path: '**', component: HomeComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
