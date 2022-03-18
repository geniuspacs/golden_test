import { TestBed } from '@angular/core/testing';
import { Ball } from 'src/app/models';

import { BallService } from './ball.service';

describe('BallService', () => {
  let service: BallService;

  let ballToSelect: Ball;

  let ballSelectedSubjectSpy: jasmine.Spy;

  let emptySelectedSubjectSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addBallsSelected method', () => {

    beforeEach(() => {
      ballToSelect = {
        color: '#F0F0F0',
        label: '1',
        value: '1'
      };

      ballSelectedSubjectSpy = spyOn((service as any).ballSelectedSubject, 'next');

      emptySelectedSubjectSpy = spyOn((service as any).emptySelectedSubject, 'next');

    });

    it('Add new ball when is not selected', () => {
      expect(service.ballsSelected.includes(ballToSelect)).toBeFalsy();
      service.addBallsSelected(ballToSelect);
      expect(service.ballsSelected.includes(ballToSelect)).toBeTruthy();

      expect(ballSelectedSubjectSpy).toHaveBeenCalledWith(service.ballsSelected);
      expect(emptySelectedSubjectSpy).toHaveBeenCalledWith(false);
    });

    it('Can not add a ball which is selected yet', () => {
      service.ballsSelected[1] = ballToSelect;
      service.addBallsSelected(ballToSelect);
      expect(service.ballsSelected.includes(ballToSelect)).toBeTruthy();

      expect(ballSelectedSubjectSpy).not.toHaveBeenCalled();
      expect(emptySelectedSubjectSpy).not.toHaveBeenCalled();
    });

  });

  describe('resetBallsSelected method', () => {
    beforeEach(() => {

      ballSelectedSubjectSpy = spyOn((service as any).ballSelectedSubject, 'next');

      emptySelectedSubjectSpy = spyOn((service as any).emptySelectedSubject, 'next');

    });

    it('Reset balls array', () => {
      service.ballsSelected = service.balls;

      // ballsSelected have no empty balls
      let indexOfEmptyBall = service.ballsSelected.findIndex(it => !it.value);
      expect(indexOfEmptyBall).toBe(-1);

      service.resetBallsSelected();

      // Now ballsSelected is empty from first position
      indexOfEmptyBall = service.ballsSelected.findIndex(it => !it.value);;
      expect(indexOfEmptyBall).toBe(0);
      expect(ballSelectedSubjectSpy).toHaveBeenCalledWith(service.ballsSelected);
      expect(emptySelectedSubjectSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('setAmount method', () => {
    let amountSubjectSpy: jasmine.Spy;

    beforeEach(() => {
      amountSubjectSpy = spyOn((service as any).amountSubject, 'next');
    });

    it('When setAmount is called, amountSubject.next is called with received value', () => {
      service.setAmount(200);
      expect(amountSubjectSpy).toHaveBeenCalledWith(200);
    });
  });

  describe('runLottery method', () => {

    let winnerNumberSubjectSpy: jasmine.Spy;
    let getWinnerNumberSpy: jasmine.Spy;

    beforeEach(() => {
      winnerNumberSubjectSpy = spyOn((service as any).winnerNumberSubject, 'next')
      getWinnerNumberSpy = spyOn((service as any), 'getWinnerNumber');
    });

    it('Get a ball which is inside balls (first ball in this case)', () => {
      getWinnerNumberSpy.and.returnValue(1);
      service.runLottery();
      expect(winnerNumberSubjectSpy).toHaveBeenCalledWith(service.balls[0]);
    });

  });

});
