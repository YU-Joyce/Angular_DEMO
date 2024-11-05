import { HttpService } from './../../http.service';
import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  formBuilder = inject(FormBuilder);
  HttpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  employeeForm = this.formBuilder.group({
    tenNhanVien: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    tuoi: [0, [Validators.required, Validators.min(18), Validators.max(100)]], // Tuổi từ 18-100
    sdt: ['', [Validators.required, Validators.pattern(/^\d{1,10}$/)]], // Số điện thoại tối đa 10 chữ số
    diaChi: ['', [Validators.required]]
  });

  employeeId!: number;
  isEdit = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.HttpService.getEmployee(this.employeeId).subscribe(result => {
        console.log(result);
        this.employeeForm.patchValue(result);
      })
    }
  }
  save() {
    console.log(this.employeeForm.value);
    const employee: IEmployee = {
      tenNhanVien: this.employeeForm.value.tenNhanVien!,
      email: this.employeeForm.value.email!,
      tuoi: this.employeeForm.value.tuoi!,
      sdt: this.employeeForm.value.sdt!,
      diaChi: this.employeeForm.value.diaChi!,
    };

    if (this.isEdit) {
      this.HttpService.updateEmployee(this.employeeId, employee).subscribe(() => {
        console.log("success");
        this.toaster.success("Cập nhật thành công");
        this.router.navigateByUrl('/employee-list');
      });
    } else {
      this.HttpService.createEmployee(employee).subscribe(() => {
        console.log("success");
        this.toaster.success("Thêm thành công");
        this.router.navigateByUrl('/employee-list');
      });
    }
  }
}
