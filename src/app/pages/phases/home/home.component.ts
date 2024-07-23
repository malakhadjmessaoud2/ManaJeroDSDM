import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { InviteUserModalComponent } from '../invite-user-modal/invite-user-modal.component';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  phases = [
    'Feasibility', 'Foundations', 'Exploration',
    'Engineering', 'Deployment', 'Post-Project'
  ];

  constructor(private dialogService: NbDialogService) {}
  openInviteModal() {
    this.dialogService.open(InviteUserModalComponent);

  }
}
