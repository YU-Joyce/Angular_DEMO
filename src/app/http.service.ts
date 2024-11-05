import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployee } from './interfaces/employee';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "https://localhost:7065";
  http = inject(HttpClient);
  constructor() { }

  // Sửa thành `Observable<IEmployee[]>` để khớp với kiểu dữ liệu là một mảng nhân viên
  getAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.apiUrl + "/api/Employee");
  }

  createEmployee(employee: IEmployee) {
    return this.http.post(this.apiUrl + "/api/Employee", employee);
  }

  getEmployee(employeeId: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.apiUrl + "/api/Employee/" + employeeId);
  }

  updateEmployee(employeeId: number, employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(this.apiUrl + "/api/Employee/" + employeeId, employee);
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/api/Employee/" + employeeId);
  }
}
