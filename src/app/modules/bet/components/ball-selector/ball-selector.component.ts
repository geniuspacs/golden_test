import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { Ball } from 'src/app/models';
import { BallService } from '../../services/ball.service';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit, OnDestroy {

  balls: Ball[] = [];

  ballsSelected: Ball[] = new Array(8).fill({});

  ballSubscription$: Subscription;

  winnerNumber$: Subscription;

  emptySelected$: Subscription;

  amount$: Subscription;

  winnerNumber: Ball;

  isEmptySelected: boolean = true;

  isLotteryWinned: boolean = false;

  amount: number;

  constructor(private ballService: BallService) { }

  ngOnInit(): void {
    this.balls = this.ballService.balls;
    this.ballSubscription$ = this.ballService.ballSelectedObservable.subscribe((ballList: Ball[]) => {
      this.ballsSelected = ballList;
    });

    this.winnerNumber$ = this.ballService.winnerNumberObservable.subscribe((winnerNumber: Ball) => {
      this.winnerNumber = winnerNumber;
      this.isLotteryWinned = this.ballsSelected.findIndex(ball => ball.value === this.winnerNumber.value) >= 0;
      this.amount = this.isLotteryWinned ? (this.amount * 1.5) : 0;
    });

    this.emptySelected$ = this.ballService.emptySelectedObservable.subscribe((isEmptySelected: boolean) => {
      this.isEmptySelected = isEmptySelected;
    });

    this.amount$ = this.ballService.amountObservable.subscribe((amount) => {
      this.amount = amount;
    });
  }

  ngOnDestroy(): void {
    if (this.ballSubscription$) {
      this.ballSubscription$.unsubscribe();
    }

    if (this.winnerNumber$) {
      this.winnerNumber$.unsubscribe();
    }

    if (this.emptySelected$) {
      this.emptySelected$.unsubscribe();
    }

    if (this.amount$) {
      this.amount$.unsubscribe();
    }
  }

  selectBall(ball: Ball) {
    this.ballService.addBallsSelected(ball);
  }

  clearSelection() {
    this.ballService.resetBallsSelected();
  }

}
