import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from '../pages-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbPopoverModule, NbRadioModule, NbRouteTabsetModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTooltipModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ECommerceModule } from '../e-commerce/e-commerce.module';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { DSDMComponent } from './dsdm/dsdm.component';
import { CrudDsdmRoutingModule } from './crud-dsdm-routing.module';
import { AddDsdmComponent } from './add-dsdm/add-dsdm.component';
import { EditorsRoutingModule } from '../editors/editors-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { EditorsModule } from '../editors/editors.module';
import { UpdateDsdmComponent } from './update-dsdm/update-dsdm.component';
import { IntroDsdmComponent } from './intro-dsdm/intro-dsdm.component';
import { AppComponent } from '../../app.component';
import { AdvDsdmComponent } from './adv-dsdm/adv-dsdm.component';
import { LimDsdmComponent } from './lim-dsdm/lim-dsdm.component';
import { WhyDsdmComponent } from './why-dsdm/why-dsdm.component';
import { HowDsdmComponent } from './how-dsdm/how-dsdm.component';
import { WhatifDsdmComponent } from './whatif-dsdm/whatif-dsdm.component';


@NgModule({
  declarations: [DSDMComponent, AddDsdmComponent, UpdateDsdmComponent, IntroDsdmComponent, AdvDsdmComponent, LimDsdmComponent, WhyDsdmComponent, HowDsdmComponent, WhatifDsdmComponent],

  imports: [
    
    CommonModule,
    CrudDsdmRoutingModule,
    ReactiveFormsModule,
    NbDialogModule,
    NbInputModule,
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule,


    LayoutModule,
    FormsModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    MiscellaneousModule,
    NbActionsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    EditorsRoutingModule,
    CKEditorModule,
    EditorsModule

  ]
})
export class CrudDsdmModule { }
