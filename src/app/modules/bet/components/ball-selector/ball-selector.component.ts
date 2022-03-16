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

  ballsSelected: Ball[] = new Array(10).fill({});

  ballSubscription$: Subscription;

  winnerNumber$: Subscription;

  emptySelected$: Subscription;

  winnerNumber: Ball;

  isEmptySelected: boolean = true;

  isLotteryWinned: boolean = false;

  constructor(private ballService: BallService) { }

  ngOnInit(): void {
    this.balls = this.ballService.balls;
    this.ballSubscription$ = this.ballService.ballSelectedObservable.subscribe((ballList: Ball[]) => {
      this.ballsSelected = ballList;
    });

    this.winnerNumber$ = this.ballService.winnerNumberObservable.subscribe((winnerNumber: Ball) => {
      this.winnerNumber = winnerNumber;
      this.isLotteryWinned = this.ballsSelected.findIndex(ball => ball.value === this.winnerNumber.value) >= 0;
      console.log(this.isLotteryWinned)
    });

    this.emptySelected$ = this.ballService.emptySelectedObservable.subscribe((isEmptySelected: boolean) => {
      this.isEmptySelected = isEmptySelected;
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
  }

  selectBall(ball: Ball) {
    this.ballService.addBallsSelected(ball);
  }

  clearSelection() {
    this.ballService.resetBallsSelected();
  }

}
