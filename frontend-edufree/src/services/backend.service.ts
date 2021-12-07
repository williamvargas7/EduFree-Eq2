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

  autenticar(credenciales: string): Observable<any> {
    const filter = '{"where":'+credenciales+'}';
    const filterEncode=encodeURIComponent(filter);
    return this.http.get(this.rootUrl + 'usuarios?filter='+filterEncode);
  }

  postRequest(controlador: string,datos: string): Observable<any> {
    const url = this.rootUrl + '/' + controlador;
    return this.http.post(
      url,
      datos, {
      headers: { 'content-type': 'application/json'}
    });
  }

  patchRequest(controlador: string, id:string, datos: string): Observable<any> {
    const url = this.rootUrl + '/' + controlador+'/'+id;
    return this.http.patch(
      url,
      datos, {
      headers: { 'content-type': 'application/json'}
    });
  }

  deleteRequest(controlador: string, id:string): Observable<any> {
    const url = this.rootUrl + '/' + controlador+'/'+id;
    return this.http.delete(
      url,{
      headers: { 'content-type': 'application/json'}
    });
  }


}
