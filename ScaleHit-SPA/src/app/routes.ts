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
import { preventUnsavedChanges } from './_guards/preventUnsaveChanges.guard';
import { ScalesListResolver } from './_resolvers/scalesList.resolver';
import { CreateScaleComponent } from './scales/createScale/createScale.component';

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
            {path: 'scales', component: ScalesComponent, resolve: {scales: ScalesListResolver}},
            {path: 'systemAdmin', component: SystemAdminComponent, resolve: {users: UsersListResolver}},
            {path: 'profile', component: ProfileComponent, resolve: {user: UserDetailResolver}, canDeactivate: [preventUnsavedChanges]},
            {path: 'scales/create', component: CreateScaleComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

// {path: 'profile/:id', component: ProfileComponent, resolve: {user: UserDetailResolver}},