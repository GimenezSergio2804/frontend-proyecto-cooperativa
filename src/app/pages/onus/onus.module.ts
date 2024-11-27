import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnusRoutingModule } from './onus-routing.module';
import { OnusMainComponent } from './onus-main/onus-main.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OnusMainComponent],
  imports: [CommonModule, OnusRoutingModule, SharedModule],
})
export class OnusModule {}
