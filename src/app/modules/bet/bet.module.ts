import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallSelectorComponent } from './components/ball-selector/ball-selector.component';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BetRoutingModule } from './bet-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BallSelectorComponent, BetSlipComponent, DashboardComponent],
  imports: [
    CommonModule,
    BetRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BetModule { }
