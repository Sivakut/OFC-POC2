import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  constructor(private http:HttpClient) { }
 
  

getResp(): Observable<any>{
  //return this.http.get('https://jsonplaceholder.typicode.com/users');
  //return this.http.get('https://api.myjson.com/bins/1ehhnb');
  //return this.http.get('https://api.myjson.com/bins/m8phb');
  //with section
  return this.http.get('https://api.myjson.com/bins/lby0h');
  
  
  
}

private currentPriceUrl = 'https://api.myjson.com/bins/m8phb';

 
async getPrice(): Promise<Object> {
  const response = await this.http.get(this.currentPriceUrl).toPromise();
  return response;
}
}
