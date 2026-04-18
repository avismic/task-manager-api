import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../models/task.model';
import { Page } from '../../../models/page.model';
import { Observable, switchMap, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  standalone: false,
})
export class List {
  private refresh$ = new BehaviorSubject<void>(undefined);
  page: number = 0;
  userName: string | null = null;
  tasks$ = this.refresh$.pipe(
    switchMap(() => {
      const params: any = {
        page: this.page,
        size: 10,
      };

      if (this.search?.trim()) {
        params.search = this.search.trim();
      }

      if (this.status) {
        params.status = this.status;
      }

      return this.taskService.getTasks(params);
    }),
  );
  confirmDeleteId: number | null = null;
  search: string = '';
  status: string = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {
    this.userName = localStorage.getItem('name');
  }
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

  onFilterChange() {
    this.refresh$.next();
  }

  onPageChange(page: number) {
    this.page = page;
    this.refresh$.next();
  }

  goToCreate() {
    this.router.navigate(['/tasks/create']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
