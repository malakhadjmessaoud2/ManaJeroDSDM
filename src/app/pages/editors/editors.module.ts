import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';

import { EditorsRoutingModule, routedComponents } from './editors-routing.module';
import { TinyMCEComponent } from './tiny-mce/tiny-mce.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    EditorsRoutingModule,
    CKEditorModule,
    CommonModule
  ],
  declarations: [
    ...routedComponents,
    TinyMCEComponent
  ],

  exports: [TinyMCEComponent]
})
export class EditorsModule { }
