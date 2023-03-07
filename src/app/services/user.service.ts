import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  API_URL = environment.apiUrl + 'users/';
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  getAll(model: any): Observable<any> {
    let url = `${this.API_URL}getAll`;
    return this.apiService.postWithToken(url, model).pipe(
      map((res: any) => res),
      catchError((err) => {
        return of(err);
      })
    );
  }
  getUserById(id: any): Observable<any> {
    let url = `${this.API_URL}find/${id}`;
    return this.apiService.getWithToken(url).pipe(
      map((res: any) => res),
      catchError((err) => {
        return of(err);
      })
    );
  }
}
