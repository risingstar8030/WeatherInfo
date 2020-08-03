import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path : '' , component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'user', loadChildren : () => import('./user/user.module').then(m=>m.UserModule),
  canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
