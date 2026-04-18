import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Create } from './create/create';
import { Edit } from './edit/edit';
import { List } from './list/list';

const routes: Routes = [
  { path: '', component: List },
  { path: 'create', component: Create },
  { path: 'edit/:id', component: Edit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
