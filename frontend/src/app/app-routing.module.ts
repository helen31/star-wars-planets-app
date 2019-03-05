import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetListComponent } from './planet-list/planet-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'planets', pathMatch: 'prefix'},
  {path: 'planets', component: PlanetListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
