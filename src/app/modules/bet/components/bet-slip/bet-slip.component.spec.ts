import { registerLocaleData } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BetSlipComponent } from './bet-slip.component';
import localeES from '@angular/common/locales/es';
import { BallService } from '../../services/ball.service';
import { defer, of } from 'rxjs';
import { Ball } from 'src/app/models';

registerLocaleData(localeES);

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;

  const ballServiceStub = jasmine.createSpyObj('BallService', ['ballSelectedObservable', 'emptySelectedObservable', 'setAmount', 'runLottery']);

  ballServiceStub.ballSelectedObservable = of([]);
  ballServiceStub.emptySelectedObservable = of([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetSlipComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{
        provide: BallService, useValue: ballServiceStub
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
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
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('form is initialized', () => {
      expect(component.form).not.toBeNull();
      expect(component.form).not.toBeUndefined();
    });

    it('should subscribe to ballSelectedObservable on ballService', () => {
      expect(ballServiceStub.ballSelectedObservable.subscribe).toHaveBeenCalled();
    });

    it('add to component.balls when ballService.ballSelectedObservable returns selected ball', () => {
      expect(component.balls.includes(newBallReturned)).toBeFalse();
      ballServiceStub.ballSelectedObservable = of([newBallReturned]);
      component.ngOnInit();
      expect(component.balls.includes(newBallReturned)).toBeTrue();
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

  });

  describe('ngOnDestroy method', () => {

    beforeEach(() => {
      fixture.detectChanges();
      spyOn(component.ballSubscription$, 'unsubscribe');
      spyOn(component.emptySelected$, 'unsubscribe');
    });

    it('call to unsubscribe method of ballSelectedObservable and emptySelectedObservable when is subscribed', () => {
      component.ngOnDestroy();
      expect(component.ballSubscription$.unsubscribe).toHaveBeenCalled();
      expect(component.emptySelected$.unsubscribe).toHaveBeenCalled();
    });

  });

  describe('amount method', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('return 0 when form.amount is initialized', () => {
      expect(component.amount).toBe(0);
      component.form.updateValueAndValidity();
    });

    it('return form.amount * 5 and set component.readyToPlay to false', () => {
      component.readyToPlay = true;
      component.form.get('amount')?.patchValue(10);
      component.form.updateValueAndValidity();
      expect(component.amount).toBe(50);
      expect(component.readyToPlay).toBeFalse();
    });
  });

  describe('getReadyToPlay method', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('No set component.readyToPlay to true neither call ballServiceStub.setAmount when form is not valid', () => {
      component.getReadyToPlay();
      expect(component.readyToPlay).toBeFalse();
      expect(ballServiceStub.setAmount).not.toHaveBeenCalled();
    });

    it('Set component.readyToPlay to true and call ballServiceStub.setAmount when form is not valid', () => {
      component.form.get('amount')?.patchValue(10);
      component.form.updateValueAndValidity();
      component.getReadyToPlay();
      expect(component.readyToPlay).toBeTrue();
      expect(ballServiceStub.setAmount).toHaveBeenCalled();
    });
  });

  describe('runLottery method', () => {

    beforeEach(() => {
      fixture.detectChanges();
      spyOn(component.form, 'reset');
    });

    it('Call to ballServiceStub.runLottery and form.reset when component.runLottery is called', () => {
      component.runLottery();
      expect(ballServiceStub.runLottery).toHaveBeenCalled();
      expect(component.form.reset).toHaveBeenCalled();
    });

  });
});
