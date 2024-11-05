import { HttpService } from './../../http.service';
import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  router = inject(Router);
  employeeList:IEmployee[] = [];
  HttpService=inject(HttpService);
  toaster = inject(ToastrService);
  displayedColumns: string[] = [
    'id',
    'tenNhanVien', 
    'email', 
    'tuoi', 
    'sdt', 
    'diaChi',
    'action',
  ];

  ngOnInit(){
    this.getEmployeeFormServer();
  }
  getEmployeeFormServer(){
    this.HttpService.getAllEmployee().subscribe(result=>{
      this.employeeList = result;
      console.log(this.employeeList);
    })
  }

  edit(id:number) {
    console.log(id);
    this.router.navigateByUrl("/employee/" + id);
  }

  delete(id:number){  
    this.HttpService.deleteEmployee(id).subscribe(()=>{
      console.log("deleted");
      //this.employeeList = this.employeeList.filter(x => x.id! === id);
      this.getEmployeeFormServer();
      this.toaster.success("Xóa thành công");
    })
  }
}
