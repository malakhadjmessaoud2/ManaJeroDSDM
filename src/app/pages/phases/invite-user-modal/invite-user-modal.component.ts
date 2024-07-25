import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-invite-user-modal',
  templateUrl: './invite-user-modal.component.html',
  styleUrls: ['./invite-user-modal.component.scss']
})
export class InviteUserModalComponent {
  searchTerm: string = '';
  users: { username: string }[] = [
    { username: 'Carla Espinosa' },
    { username: 'Bob Kelso' },
    { username: 'Janitor' },
    { username: 'Perry Cox' },
    { username: 'Ben Sullivan' },
  ];
  filteredUsers: { username: string }[] = [];
  selectedUser: { username: string } | null = null;

  constructor(protected ref: NbDialogRef<InviteUserModalComponent>) {}

  searchUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectUser(user: { username: string }) {
    this.selectedUser = user;
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.selectedUser) {
      this.ref.close(this.selectedUser);
    }
  }
}
