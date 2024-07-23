import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-invite-user-modal',
  templateUrl: './invite-user-modal.component.html',
  styleUrls: ['./invite-user-modal.component.scss']
})
export class InviteUserModalComponent {
  email: string;

  constructor(protected ref: NbDialogRef<InviteUserModalComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.email) {
      // Logique pour inviter l'utilisateur
      this.ref.close();
    }
  }
}
