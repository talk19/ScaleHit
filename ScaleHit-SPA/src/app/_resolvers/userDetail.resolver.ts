import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {

        // get the ID from the url
        // return this.userService.getUser(route.params['id'])

        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                console.log(error);
                // this.router.navigate(['/scales']);
                return of(null);
            })
        );
    }
}