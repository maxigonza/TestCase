import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MasterDataService } from 'src/app/master-data.service';
import { UserService } from 'src/app/user.service';
import { User } from 'src/types/User';

@Component({
  selector: 'app-user-form-edit',
  templateUrl: './user-form-edit.component.html',
  styleUrls: ['./user-form-edit.component.scss']
})
export class UserFormEditComponent {
  isAdminFormatControl = 0;
  isEditMode = false;
  touched = false;

  userForm: FormGroup= new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    isAdmin: new FormControl('0'),
  });
  
  constructor(private userService: UserService, private masterData: MasterDataService) {}

  ngOnInit(): void {
    this.masterData.getIsAdminSelection().subscribe((data: any) => {
      this.isAdminFormatControl = data.type;
    });

    this.userService.selectedUser.subscribe(user => {
      if (user) {
        this.userForm.patchValue({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: String(Number(user.isAdmin))
        });
        this.isEditMode = true;
      }
    });
  }

  saveUser() {
    this.touched = true;
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
  
      let updateUserObservable: Observable<any>;
  
      if (this.isEditMode) {
        updateUserObservable = this.userService.updateUser(user);
      } else {
        updateUserObservable = this.userService.addUser(user);
      }
  
      updateUserObservable.subscribe({
        next: () => {
          this.resetForm();
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === 404 && error.error) {
            alert(error.error);
            this.resetForm();
          }
        }
      });
    }
    
  }

  resetForm() {
    this.userForm.markAsUntouched();
    this.isEditMode = false;
    this.touched = false;
    this.userForm.patchValue({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      isAdmin: '0'
    });
  }
}
