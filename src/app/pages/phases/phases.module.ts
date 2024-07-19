import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { InviteUserModalComponent } from './invite-user-modal/invite-user-modal.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    InviteUserModalComponent,
  ],
  imports: [
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbThemeModule.forRoot(),
    CommonModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [InviteUserModalComponent],

})
export class PhasesModule { }
