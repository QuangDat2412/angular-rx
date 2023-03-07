import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage.service';
import { catchError, map } from 'rxjs/operators';
import { KEY_STORAGE, STATUS_CODE } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  isCallCheckToken: BehaviorSubject<any>;
  constructor(
    public httpClient: HttpClient,
    public storageService: LocalStorageService
  ) {
    this.isCallCheckToken = new BehaviorSubject<boolean>(false);
  }

  get = (url: string) => {
    return this.httpClient.get(url);
  };

  post = (url: string, data: any) => {
    return this.httpClient.post(url, data);
  };

  postFile = (url: string, data: any): Observable<any> => {
    let headers = this.getHeaders();
    return this.httpClient.post(url, data, {
      reportProgress: true,
      observe: 'events',
      headers,
    });
  };

  getHeaders = () => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  };

  postWithToken = (url: string, data: any): Observable<any> => {
    let headers = this.getHeaders();
    return this.httpClient
      .post(url, data, { observe: 'response', headers, withCredentials: true })
      .pipe(
        map((res: any) => {
          return res.body;
        }),
        catchError((err) => {
          if (err.status == STATUS_CODE.UNAUTHORIZED) {
            this.isCallCheckToken.next(true);
          }
          return throwError(err);
        })
      );
  };

  getWithToken = (url: string): Observable<any> => {
    let headers = this.getHeaders();
    return this.httpClient
      .get(url, { observe: 'response', headers, withCredentials: true })
      .pipe(
        map((res: any) => {
          return res.body;
        }),
        catchError((err) => {
          if (err.status == STATUS_CODE.UNAUTHORIZED) {
            this.isCallCheckToken.next(true);
          }
          return throwError(err);
        })
      );
  };
  putWithToken = (url: string, data: any): Observable<any> => {
    let headers = this.getHeaders();
    return this.httpClient
      .put(url, data, { observe: 'response', headers, withCredentials: true })
      .pipe(
        map((res: any) => {
          return res.body;
        }),
        catchError((err) => {
          if (err.status == STATUS_CODE.UNAUTHORIZED) {
            this.isCallCheckToken.next(true);
          }
          return throwError(err);
        })
      );
  };
  deleteWithToken = (url: string): Observable<any> => {
    let headers = this.getHeaders();
    return this.httpClient
      .delete(url, { observe: 'response', headers, withCredentials: true })
      .pipe(
        map((res: any) => {
          return res.body;
        }),
        catchError((err) => {
          if (err.status == STATUS_CODE.UNAUTHORIZED) {
            this.isCallCheckToken.next(true);
          }
          return throwError(err);
        })
      );
  };

  uploadFileWithToken = (url: string, file: any): Observable<any> => {
    let headers = this.getHeaders();
    let form = new FormData();
    form.append('file', file);
    return this.httpClient.post(url, form, { headers });
  };
}
