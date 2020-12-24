import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './tests/list/list.component';
import { ViewComponent } from './tests/view/view.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent,
  },
  {
    path: 'view', component: ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
