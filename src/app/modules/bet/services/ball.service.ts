import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import { Ball } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class BallService {

  balls: Ball[] = [{
    label: '1',
    value: '1',
    color: '#DC535B'
  }, {
    label: '2',
    value: '2',
    color: '#FDF8E0'
  }, {
    label: '3',
    value: '3',
    color: '#41AC68'
  }, {
    label: '4',
    value: '4',
    color: '#F9EDED'
  }, {
    label: '5',
    value: '5',
    color: '#F4CF36'
  }, {
    label: '6',
    value: '6',
    color: '#EFF4EE'
  }, {
    label: '7',
    value: '7',
    color: '#DD4F54'
  }, {
    label: '8',
    value: '8',
    color: '#FCF5E3'
  }, {
    label: '9',
    value: '9',
    color: '#43AA67'
  }, {
    label: '10',
    value: '10',
    color: '#FCEBED'
  }];

  ballsSelected: Observable<Ball[]> = of(new Array(10).fill({})); // Lista de seleccionados (es un observable)

  constructor() {
  }

  getSelectedBalls(): Observable<Ball[]> {
    return this.ballsSelected;
  }

}
