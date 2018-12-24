import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { DialogpageComponent } from './dialogpage/dialogpage.component';

const routes: Routes = [
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'registerpage', component: RegisterpageComponent },
  { path: 'dialogpage', component: DialogpageComponent },
  { path: '**', redirectTo: 'dialogpage' },
  { path: '', redirectTo: 'dialogpage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
