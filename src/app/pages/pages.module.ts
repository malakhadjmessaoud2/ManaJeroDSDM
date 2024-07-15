import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbMenuModule, NbRouteTabsetModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { FormsModule } from '@angular/forms';

import { LayoutModule } from './layout/layout.module';
import { CrudDsdmModule } from './crud-dsdm/crud-dsdm.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,

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
    MiscellaneousModule
  ],
  declarations: [
PagesComponent
  ],

})
export class PagesModule {
}
