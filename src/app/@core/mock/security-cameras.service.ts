import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Camera, SecurityCamerasData } from '../data/security-cameras';

@Injectable()
export class SecurityCamerasService extends SecurityCamerasData {

  private cameras: Camera[] = [
    {
      title: 'DSDM life cycle',
      source: 'assets/images/dsdm1.jpg',
    },
    {
      title: 'Process',
      source: 'assets/images/dsdm2.jpg',
    },
    {
      title: 'DSDM is one of Agile methods',
      source: 'assets/images/dsdm3.jpg',
    },
    {
      title: 'DSDM principles',
      source: 'assets/images/dsdm4.jpg',
    },
  ];

  getCamerasData(): Observable<Camera[]> {
    return observableOf(this.cameras);
  }
}
