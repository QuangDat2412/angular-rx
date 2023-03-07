import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  of,
  Subscription,
  throwError,
} from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  currentUser$: Observable<any>;
  currentUserSubject: BehaviorSubject<any>;
  message: BehaviorSubject<any>;
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }
  API_URL = environment.apiUrl;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private apiService: ApiService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.message = new BehaviorSubject<string>('');
    this.currentUser$ = this.currentUserSubject.asObservable();
    // this.unsubscribe.push(subscr);
  }
  logout() {
    this.cookieService.delete('accessToken');
  }
  login(model: any): Observable<any> {
    let url = `${this.API_URL}auth/login`;

    return this.apiService.post(url, model).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  // logout = (param: any): Promise<Object> => {
  //   return new Promise((resolve, reject) => {
  //     let url = `${this.API_URL}auth/logout`;
  //     this.apiService.post(url, param).subscribe(
  //       (res: any) => {
  //         this.currentUserSubject.next(undefined);
  //         this.router.navigate(['login']);
  //       },
  //       (err) => {
  //         this.currentUserSubject.next(undefined);
  //         this.router.navigate(['login']);
  //       }
  //     );
  //   });
  // };

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
