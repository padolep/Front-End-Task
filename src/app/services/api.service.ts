import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}
  postuser(data: any) {
    return this.http.post<any>("http://localhost:3000/userlist/",data);
  }
  getuser() {
    return this.http.get<any>("http://localhost:3000/userlist/");
  }

  putuser(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/userlist/"+id,data);
  }

  deletuser(id:number){
    return this.http.delete<any>("http://localhost:3000/userlist/"+id)
  }
}
