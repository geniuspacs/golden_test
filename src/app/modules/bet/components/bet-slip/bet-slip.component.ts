import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { Ball } from 'src/app/models';
import { BallService } from '../../services/ball.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit, OnDestroy {

  ballSubscription$: Subscription;

  balls: Ball[] = [];

  constructor(private ballService: BallService) {
  }

  ngOnInit(): void {
    this.ballSubscription$ = this.ballService.getSelectedBalls().subscribe((selectedList: Ball[]) => {
      this.balls = selectedList;
    });
  }

  ngOnDestroy(): void {
    if (this.ballSubscription$) {
      this.ballSubscription$.unsubscribe();
    }
  }

}
