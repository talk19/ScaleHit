import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ScaleService } from '../_services/scale.service';

@Injectable()
export class ScalesListResolver implements Resolve<User[]> {
    constructor(private scaleService: ScaleService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.scaleService.getScales().pipe(
            catchError(error => {
                console.log(error);
                this.router.navigate(['/home']);

                return of(null);
            })
        );
    }
}