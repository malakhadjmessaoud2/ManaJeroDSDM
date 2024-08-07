import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbTableModule, NbTabsetModule, NbThemeModule, NbToastrModule, NbTreeGridModule } from '@nebular/theme';
import { InviteUserModalComponent } from './invite-user-modal/invite-user-modal.component';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DsdmMethodeComponent } from './dsdm-methode/dsdm-methode.component';
import { ListProjectComponent } from './list-project/list-project.component';
import { EditorsModule } from '../editors/editors.module';
import { EditorsRoutingModule } from '../editors/editors-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NbDateFnsDateModule } from '@nebular/date-fns';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'listProject', component: ListProjectComponent },
  { path: 'dsdm-methode', component: DsdmMethodeComponent }

];

@NgModule({
  declarations: [
    HomeComponent,
    InviteUserModalComponent,
    ListProjectComponent,
    DsdmMethodeComponent,
  ],
  imports: [
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({ format: 'dd/MM/yyyy' }),
    EditorsRoutingModule,
    CKEditorModule,
    EditorsModule,
        NbSelectModule,
    NbTreeGridModule,
    FormsModule,
    NbListModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    NbThemeModule.forRoot(),
    CommonModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [InviteUserModalComponent],

})
export class PhasesModule { }
