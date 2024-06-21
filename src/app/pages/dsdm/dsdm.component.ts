import { Component, ViewChild } from '@angular/core';
import { SecurityCamerasComponent } from '../dashboard/security-cameras/security-cameras.component';
import { InfiniteListComponent } from '../layout/infinite-list/infinite-list.component';

@Component({
  selector: 'ngx-dsdm',
  templateUrl: './dsdm.component.html',
  styleUrls: ['./dsdm.component.scss']
})
export class DSDMComponent extends SecurityCamerasComponent{
  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1
  };
  @ViewChild(InfiniteListComponent) infiniteListComponent: InfiniteListComponent;

  loadNext(cardData) {
    this.infiniteListComponent.loadNext(cardData);
  }
}
