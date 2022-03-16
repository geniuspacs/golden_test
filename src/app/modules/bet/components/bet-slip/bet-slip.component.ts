import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  emptySelected$: Subscription;

  balls: Ball[] = new Array(10).fill({});

  isEmptySelected: boolean = true;

  form: FormGroup;

  constructor(private ballService: BallService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.ballSubscription$ = this.ballService.ballSelectedObservable.subscribe((ballList: Ball[]) => {
      this.balls = ballList;
    });
    this.emptySelected$ = this.ballService.emptySelectedObservable.subscribe((isEmptySelected: boolean) => {
      this.isEmptySelected = isEmptySelected;
    });
    this.form = this.fb.group({
      amount: [undefined, [Validators.required, Validators.min(5)]]
    });
  }

  ngOnDestroy(): void {
    if (this.ballSubscription$) {
      this.ballSubscription$.unsubscribe();
    }
    if (this.emptySelected$) {
      this.emptySelected$.unsubscribe();
    }
  }

  get amount() {
    return this.form.get('amount')?.value * 5;
  }

  runLottery() {

    this.ballService.runLottery();

  }

}
