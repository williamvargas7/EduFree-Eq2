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

  autenticar(credenciales: string): Observable<any> {
    const filter = '{"where":'+credenciales+'}';
    const filterEncode=encodeURIComponent(filter);
    return this.http.get(this.rootUrl + 'usuarios?filter='+filterEncode);
  }

  postRequest(controlador: string,datos: string): Observable<any> {
    const url = this.rootUrl + controlador;
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
