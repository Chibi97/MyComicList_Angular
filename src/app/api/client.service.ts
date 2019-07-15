import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API = 'http://apicomics.oljaivkovic.space/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  get<TResponse>(route: string, params: any = {}) {
    const httpOpts = { params, headers: this.headers};
    return this.http.get<TResponse>(`${API}/${route}`, httpOpts);
  }

  post<TRequest, TResponse>(route: string, data: TRequest) {
    const httpOpts = { headers: this.headers};
    return this.http
      .post<TResponse>(`${API}/${route}`, data, httpOpts);
  }

  delete<TResponse>(route: string) {
    const httpOpts = { headers: this.headers };
    return this.http
      .delete<TResponse>(`${API}/${route}`, httpOpts);
  }

  setAuthorizationHeader(token: string) {
    this.headers = this.headers.set('Authorization', token);
  }
}

