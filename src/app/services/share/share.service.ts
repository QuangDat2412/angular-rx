import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './../storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ShareService {
  API_URL = environment.apiUrl;
  $isLoading: BehaviorSubject<boolean>;
  constructor(
    public apiService: ApiService,
    public http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.$isLoading = new BehaviorSubject<boolean>(false);
  }
}
