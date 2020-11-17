import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scale } from '../_models/scale';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getScales(): Observable<Scale[]> {
  return this.http.get<Scale[]>(this.baseUrl + 'Scales');
}

getScale(id): Observable<Scale> {
  return this.http.get<Scale>(this.baseUrl + 'Scales/' + id);
}

}
