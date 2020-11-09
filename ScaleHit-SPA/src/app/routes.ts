import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlansComponent } from './plans/plans.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScalesComponent } from './scales/scales.component';
import { AuthGuard } from './_guards/auth.guard';
import { SystemAdminComponent } from './systemAdmin/systemAdmin.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailResolver } from './_resolvers/userDetail.resolver';
import { UsersListResolver } from './_resolvers/usersList.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'plans', component: PlansComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'scales', component: ScalesComponent},
            {path: 'systemAdmin', component: SystemAdminComponent, resolve: {users: UsersListResolver}},
            {path: 'profile/:id', component: ProfileComponent, resolve: {user: UserDetailResolver}},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
