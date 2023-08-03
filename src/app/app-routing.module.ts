import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopoComponent } from './game/topo/topo.component';
import { AppComponent } from './app.component';

 

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'game', component: TopoComponent },
  { path: '**', redirectTo: '' },
];

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}