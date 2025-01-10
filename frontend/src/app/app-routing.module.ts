import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormCreateComponent } from './components/form-create/form-create.component';
import { FormViewComponent } from './components/form-view/form-view.component';
import { AuthGuard } from './guard/auth.guard';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'form-list', component: FormListComponent},
  { path: 'form-create', component: FormCreateComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'form-view/:id', component: FormViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}