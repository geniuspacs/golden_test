import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Ball } from 'src/app/models';
import { BallService } from '../../services/ball.service';
import localeES from '@angular/common/locales/es';
import { BallSelectorComponent } from './ball-selector.component';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeES);

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;

  const ballServiceStub = jasmine.createSpyObj('BallService', ['ballSelectedObservable', 'emptySelectedObservable', 'winnerNumberObservable', 'amountObservable', 'addBallsSelected', 'resetBallsSelected']);

  ballServiceStub.ballSelectedObservable = of([]);
  ballServiceStub.emptySelectedObservable = of(false);
  ballServiceStub.winnerNumberObservable = of({});
  ballServiceStub.amountObservable = of(0);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BallSelectorComponent],
      providers: [
        { provide: BallService, useValue: ballServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit method', () => {
    const newBallReturned: Ball = {
      label: '1',
      value: '1',
      color: '#F0F0F0'
    };

    beforeEach(() => {
      spyOn(ballServiceStub.ballSelectedObservable, 'subscribe');
      spyOn(ballServiceStub.emptySelectedObservable, 'subscribe');
      spyOn(ballServiceStub.winnerNumberObservable, 'subscribe');
      spyOn(ballServiceStub.amountObservable, 'subscribe');
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('component.balls is initialized with balls in ballServiceStub', () => {
      expect(component.balls).toBe(ballServiceStub.balls);
    });

    it('should subscribe to ballSelectedObservable on ballService', () => {
      expect(ballServiceStub.ballSelectedObservable.subscribe).toHaveBeenCalled();
    });

    it('add to component.ballsSelected when ballService.ballSelectedObservable returns selected ball', () => {
      expect(component.ballsSelected.includes(newBallReturned)).toBeFalse();
      ballServiceStub.ballSelectedObservable = of([newBallReturned]);
      component.ngOnInit();
      expect(component.ballsSelected.includes(newBallReturned)).toBeTrue();
    });

    it('should subscribe to emptySelectedObservable on ballService', () => {
      expect(ballServiceStub.emptySelectedObservable.subscribe).toHaveBeenCalled();
    });

    it('set component.isEmptySelected with value returned on ballService.emptySelectedObservable', () => {
      expect(component.isEmptySelected).toBeTrue();
      ballServiceStub.emptySelectedObservable = of(false);
      component.ngOnInit();
      expect(component.isEmptySelected).toBeFalse();
    });

    it('should subscribe to winnerNumberObservable on ballService', () => {
      expect(ballServiceStub.winnerNumberObservable.subscribe).toHaveBeenCalled();
    });

    it('set component.winnerNumber with value returned on ballService.winnerNumberObservable, amount and check if you are the winner', () => {
      expect(component.winnerNumber).toBeUndefined();
      expect(component.isLotteryWinned).toBeFalse();
      expect(component.amount).toBeUndefined();
      ballServiceStub.winnerNumberObservable = of(newBallReturned);
      component.ngOnInit();
      expect(component.winnerNumber).toBe(newBallReturned);
      expect(component.isLotteryWinned).toBeFalse();
      expect(component.amount).toBe(0);
    });

    it('when you win, set amount winned and isLotteryWinned = true', () => {
      component.ballsSelected[0] = newBallReturned;

      ballServiceStub.amountObservable = of(100);

      expect(component.winnerNumber).toBeUndefined();
      expect(component.isLotteryWinned).toBeFalse();
      expect(component.amount).toBeUndefined();
      ballServiceStub.winnerNumberObservable = of(newBallReturned);
      component.ngOnInit();
      expect(component.winnerNumber).toBe(newBallReturned);
      expect(component.isLotteryWinned).toBeTrue();
      expect(component.amount).toBe(100);
    });

  });

  describe('ngOnDestroy method', () => {

    beforeEach(() => {
      fixture.detectChanges();
      spyOn(component.ballSubscription$, 'unsubscribe');
      spyOn(component.emptySelected$, 'unsubscribe');
      spyOn(component.winnerNumber$, 'unsubscribe');
      spyOn(component.amount$, 'unsubscribe');
    });

    it('call to unsubscribe method of ballSelectedObservable, emptySelectedObservable, winnerNumberObservable, and amountObservable when is subscribed', () => {
      component.ngOnDestroy();
      expect(component.ballSubscription$.unsubscribe).toHaveBeenCalled();
      expect(component.emptySelected$.unsubscribe).toHaveBeenCalled();
      expect(component.winnerNumber$.unsubscribe).toHaveBeenCalled();
      expect(component.amount$.unsubscribe).toHaveBeenCalled();
    });

  });

  it('Call to ballServiceStub.addBallsSelected when call component.selectBall', () => {
    const ballToSelect: Ball = {
      value: '',
      label: '',
      color: ''
    };
    component.selectBall(ballToSelect);
    expect(ballServiceStub.addBallsSelected).toHaveBeenCalledWith(ballToSelect);
  });

  it('Call to ballServiceStub.resetBallsSelected when call component.clearSelection', () => {
    component.clearSelection();
    expect(ballServiceStub.resetBallsSelected).toHaveBeenCalled();
  });
});
