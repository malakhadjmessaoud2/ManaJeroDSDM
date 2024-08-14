import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbRadioModule, NbSelectModule, NbStepperModule, NbTableModule, NbTabsetModule, NbThemeModule, NbToastrModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { InviteUserModalComponent } from './invite-user-modal/invite-user-modal.component';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DsdmMethodeComponent } from './dsdm-methode/dsdm-methode.component';
import { ListProjectComponent } from './list-project/list-project.component';
import { EditorsModule } from '../editors/editors.module';
import { EditorsRoutingModule } from '../editors/editors-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { DsdmDashComponent } from './dsdm-dash/dsdm-dash.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardModule } from '../dashboard/dashboard.module';

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
    DsdmDashComponent
  ],
  imports: [
    // DashboardModule,
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
    RouterModule.forChild(routes),
    ThemeModule,
    NbUserModule,
    NbActionsModule,
    NbRadioModule,
    NgxEchartsModule,
    NbAccordionModule,
    NbStepperModule,

  ],
  entryComponents: [InviteUserModalComponent],

})
export class PhasesModule { }
