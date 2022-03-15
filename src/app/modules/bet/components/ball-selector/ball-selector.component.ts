import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { Ball } from 'src/app/models';
import { BallService } from '../../services/ball.service';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  balls: Ball[] = [];

  ballsSelected: Ball[] = [];

  constructor(private ballService: BallService) { }

  ngOnInit(): void {
    this.balls = this.ballService.balls;
    this.ballService.getSelectedBalls().subscribe((ballList: Ball[]) => {
      this.ballsSelected = ballList;
    });
  }

  selectBall(ball: Ball) {
    if (!this.ballsSelected.includes(ball)) {
      const lastSelectedIndex = this.ballsSelected.findIndex(ball => !ball.value);
      this.ballsSelected[lastSelectedIndex] = { ...ball };
    }
  }

  clearSelection() {
    this.ballsSelected.forEach(it => {
      it.color = '';
      it.label = '';
      it.value = '';
    });
  }

}
