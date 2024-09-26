import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  $user = new BehaviorSubject<any | undefined>(undefined);
  baseUrl:string = environment.apiURL;

  constructor(private http: HttpClient) { }

  
  //Auth 
  login(request: any):Observable<any>{
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl+'/Auth/login',request, {headers})
  }

  setUser(user:any){
    this.$user.next(user);
    localStorage.setItem('email', user.email);
    localStorage.setItem('roles', user.roles.join(','));
  }

  user():Observable<any | undefined>{
    return this.$user.asObservable();
  }

  getUser():any|undefined{
    const email = localStorage.getItem('email')
    const roles = localStorage.getItem('roles')

    if(email && roles){
      const user: any = {
        email: email,
        roles: roles.split(',')
      };
      
      return user;
    }
    return undefined;
  }

  logout(){
    localStorage.clear();
    this.$user.next(undefined);
  }

  ///////Auth fin

  //https://localhost:7072/api/Content?category=BT
  getContentsByCategory(category: string):Observable<any>{
    return this.http.get(this.baseUrl+"/Content?category="+category)
  }

  getContentsById(id: string):Observable<any>{
    return this.http.get(this.baseUrl+"/Content/"+id)
  }

  getVideosByCurrentTime() {
    return this.http.get<any[]>(`${this.baseUrl}/Content/current`);
  }
  


  //APis que necesitan authorization

  postContent(contentData: FormData, token:string):Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post(this.baseUrl+'/Content/upload',contentData, {headers})
  }


  updateContent(id:string,contentData: FormData, token:string):Observable<object>{
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.put(this.baseUrl+'/Content/'+id,contentData, {headers})
  }

  deleteContent(id: string, token:string): Observable<object> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.delete(`${this.baseUrl}/Content/${id}`, { headers });
  }

}
