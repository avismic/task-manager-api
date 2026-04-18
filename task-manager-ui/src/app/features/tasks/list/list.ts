import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../models/task.model';
import { Page } from '../../../models/page.model';
import { Observable, switchMap, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  standalone: false,
})
export class List {
  private refresh$ = new BehaviorSubject<void>(undefined);
  tasks$ = this.refresh$.pipe(switchMap(() => this.taskService.getTasks({ page: 0, size: 10 })));
  confirmDeleteId: number | null = null;

  constructor(private taskService: TaskService) {}

  onDeleteClick(id: number) {
    if (this.confirmDeleteId === id) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          console.log('Deleted:', id);
          this.confirmDeleteId = null;

          // refresh list
          this.refresh$.next();
        },
        error: (err) => {
          console.error('Delete error:', err);
        },
      });
    } else {
      this.confirmDeleteId = id;
    }
  }

  onToggle(id: number) {
    this.taskService.toggleTask(id).subscribe({
      next: () => {
        console.log('Toggled:', id);
        this.refresh$.next();
      },
      error: (err) => {
        console.error('Toggle error:', err);
      },
    });
  }
}
