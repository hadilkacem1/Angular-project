import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WhoAreWe1Component } from './pages/who-are-we1/who-are-we1.component';
import { WhoAreWe2Component } from './pages/who-are-we2/who-are-we2.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SectionComponent } from './pages/section/section.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { HttpClientModule } from '@angular/common/http';
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AjputerEmployeComponent } from './ajputer-employe/ajputer-employe.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListcontactComponent } from './listcontact/listcontact.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AjoutercontactComponent } from './ajoutercontact/ajoutercontact.component';
import { ModifiercontactComponent } from './modifiercontact/modifiercontact.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WhoAreWe1Component,
    WhoAreWe2Component,
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    ListeEmployesComponent,
    ModifierEmployeComponent,
    AjputerEmployeComponent,
    ListcontactComponent,
    SidebarComponent,
    NavbarComponent,
    AjoutercontactComponent,
    ModifiercontactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
