import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scale } from '../_models/scale';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getScales(userId: number): Observable<Scale[]> {
    return this.http.get<Scale[]>(
      this.baseUrl + userId + '/Scales'
    );
  }

  getScale(userId: number, id: number): Observable<Scale> {
    return this.http.get<Scale>(
      this.baseUrl + userId + 'Scales/' + id
    );
  }

  deleteScale(userId: number, id: number) {
    return this.http.delete(this.baseUrl + userId + '/Scales/' + id);
  }
}
