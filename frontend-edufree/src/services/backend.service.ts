import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  rootUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(this.rootUrl + url);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(this.rootUrl + url, body);
  }

  patch(url: string, body: any): Observable<any> {
    return this.http.patch(this.rootUrl + url, body);
  }

  deleteById(url: string, id: string): Observable<any> {
    return this.http.delete(this.rootUrl + url + id);
  }

  getById(url: string, id: string): Observable<any> {
    return this.http.get(this.rootUrl + url + id);
  }

  putById(url: string, id: string, body: any): Observable<any> {
    return this.http.put(this.rootUrl + url + id, body);
  }

  patchById(url: string, id: string, body: any): Observable<any> {
    return this.http.patch(this.rootUrl + url + id, body);
  }

}
