import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UsersListResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot) : Observable<User[]> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                console.log(error);
                this.router.navigate(['/scales']);

                return of(null);
            })
        );
    }
}