// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from 'src/models/Employe';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8085/api/employes';

  constructor(private http: HttpClient) {}

// src/app/services/employee.service.ts
getEmployees(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.apiUrl}/tous`);
  }  
// src/app/services/employee.service.ts

addEmployee(employee: Employe): Observable<Employe> {
    return this.http.post<Employe>(`${this.apiUrl}/ajouter`, employee);
  }
  

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
  }
  

  updateEmployee(id: number, employee: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.apiUrl}/modifier/${id}`, employee);
  }
}
