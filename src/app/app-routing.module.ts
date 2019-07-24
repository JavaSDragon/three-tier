import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegComponent } from './reg/reg.component';
import { ResultComponent } from './result/result.component';


const routes: Routes = [
  { path: 'reg', component: RegComponent },
  { path: 'records', component: ResultComponent },
  { path: '', redirectTo: '/records', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
