import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';


import { MainNavComponent } from './mainNav/mainNav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HomeNavComponent } from './homeNav/homeNav.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ScalesComponent } from './scales/scales.component';
import { PlansComponent } from './plans/plans.component';
import { appRoutes } from './routes';
import { SystemAdminComponent } from './systemAdmin/systemAdmin.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailResolver } from './_resolvers/userDetail.resolver';
import { UsersListResolver } from './_resolvers/usersList.resolver';
import { preventUnsavedChanges } from './_guards/preventUnsaveChanges.guard';
import { ChangePasswordComponent } from './profile/changePassword/changePassword.component';
import { ScalesListResolver } from './_resolvers/scalesList.resolver';
import { CreateScaleComponent } from './scales/createScale/createScale.component';
import { DeleteMessageComponent } from './deleteMessage/deleteMessage.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [		
    AppComponent,
      ValueComponent,
      MainNavComponent,
      LoginComponent,
      HomeComponent,
      RegisterComponent,
      HomeNavComponent,
      ScalesComponent,
      PlansComponent,
      SystemAdminComponent,
      ProfileComponent,
      ChangePasswordComponent,
      CreateScaleComponent,
      DeleteMessageComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: ['localhost:5001/api/auth']
      }
    }),
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    UserDetailResolver,
    UsersListResolver,
    preventUnsavedChanges,
    ScalesListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
