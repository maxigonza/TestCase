import { Component } from '@angular/core';
import { User } from "../../../types/User";
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent  {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userUpdated.subscribe(() => {
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
    });
  
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
 
  delete(user: User) {
    this.userService.deleteUser(user.id).subscribe((data) => {
      console.debug(data);
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
    });
  }

  edit(user: User) {
    this.userService.getUser(user.id).subscribe((data) => {
      this.userService.setSelectedUser(data);
    });
  }
}
