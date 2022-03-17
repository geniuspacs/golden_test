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

  ballsSelected: Ball[] = new Array(8).fill({});

  winnerNumber: Ball;

  emptySelected: boolean = true;

  amount: number;

  private ballSelectedSubject: Subject<Ball[]> = new Subject<Ball[]>();
  ballSelectedObservable: Observable<Ball[]> = this.ballSelectedSubject.asObservable();

  private winnerNumberSubject: Subject<Ball> = new Subject<Ball>();
  winnerNumberObservable: Observable<Ball> = this.winnerNumberSubject.asObservable();

  private emptySelectedSubject: Subject<boolean> = new Subject<boolean>();
  emptySelectedObservable: Observable<boolean> = this.emptySelectedSubject.asObservable();

  private amountSubject: Subject<number> = new Subject<number>();
  amountObservable: Observable<number> = this.amountSubject.asObservable();

  constructor() {
  }

  addBallsSelected(ball: Ball) {
    if (!this.ballsSelected.includes(ball)) {
      const lastSelectedIndex = this.ballsSelected.findIndex(ball => !ball.value);
      this.ballsSelected[lastSelectedIndex] = ball;
      this.ballSelectedSubject.next(this.ballsSelected);
      this.emptySelectedSubject.next(false);
    }
  }

  resetBallsSelected() {
    this.ballsSelected = Array(8).fill({});
    this.ballSelectedSubject.next(this.ballsSelected);
    this.emptySelectedSubject.next(true);
  }

  setAmount(amount: number) {
    this.amount = amount;
    this.amountSubject.next(this.amount);
  }

  runLottery() {
    const numberWinner = Math.floor((Math.random() * 10) + 1);
    this.winnerNumber = this.balls[numberWinner - 1];
    this.winnerNumberSubject.next(this.winnerNumber);
  }

}
