import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlansComponent } from './plans/plans.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScalesComponent } from './scales/scales.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'scales', component: ScalesComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
