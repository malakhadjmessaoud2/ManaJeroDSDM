import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DSDMComponent } from './dsdm/dsdm.component';
import { AddDsdmComponent } from './add-dsdm/add-dsdm.component';
import { UpdateDsdmComponent } from './update-dsdm/update-dsdm.component';

const routes: Routes = [
  { path: '',
    component: DSDMComponent },
    { path: 'add',
      component: AddDsdmComponent },
      { path: 'update',
        component: UpdateDsdmComponent },
        

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudDsdmRoutingModule { }
