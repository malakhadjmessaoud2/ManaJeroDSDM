import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

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


  constructor() {}




}
