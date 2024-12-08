// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobService {
//   apiEndPoint: string = 'https://localhost:7200/api/';

//   constructor(private http: HttpClient) { }

//   registerUser(obj: any) {
//     return this.http.post(this.apiEndPoint +'user/register', obj)
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  apiEndPoint: string = 'https://localhost:7200/api/';

  constructor(private http: HttpClient) { }

  registerUser(obj: any): Observable<any> {
    return this.http.post(this.apiEndPoint + 'users/register', obj); 
  }

  login(obj: any) {
    return this.http.post(this.apiEndPoint +'users/login', obj)
  }


 // Create a new job
 createJob(job: any): Observable<any> {
  return this.http.post(this.apiEndPoint + 'JobListing', job);
}


 // Fetch companies
 getCompanies(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiEndPoint}Company`);
}
 

  // Create new company
  createCompany(companyData: {
    companyId: number;
    companyName: string;
    address: string;
    description: string;
    website: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}Company`, companyData);
  }

  // Create a new employer profile
  createEmployerJob(employerData: {
    employerId: number;
    userId: number;
    companyId: number;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}Employers`, employerData);
  }
}