/**
 * Collection of components, directives and pipes
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';
import { BrowseComponent } from './browse.component';
import { HelpComponent } from './help.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { UnitService } from './unit.service';

const myRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'help', component: HelpComponent },
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ListComponent,
    AddComponent,
    BrowseComponent,
    PageNotFoundComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(myRoutes)
  ],
  providers: [UnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
