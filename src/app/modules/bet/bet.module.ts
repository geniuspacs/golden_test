import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallSelectorComponent } from './components/ball-selector/ball-selector.component';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BetRoutingModule } from './bet-routing.module';



@NgModule({
  declarations: [BallSelectorComponent, BetSlipComponent, DashboardComponent],
  imports: [
    CommonModule,
    BetRoutingModule
  ]
})
export class BetModule { }
