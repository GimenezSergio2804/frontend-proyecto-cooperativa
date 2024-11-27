import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnusMainComponent } from './onus-main/onus-main.component';

const routes: Routes = [{ path: '', component: OnusMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnusRoutingModule {}
