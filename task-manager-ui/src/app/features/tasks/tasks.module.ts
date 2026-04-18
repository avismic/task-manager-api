import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { List } from './list/list';
import { Create } from './create/create';
import { Edit } from './edit/edit';


@NgModule({
  declarations: [
    List,
    Create,
    Edit
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule
  ]
})
export class TasksModule { }
