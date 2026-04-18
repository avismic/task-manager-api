import { Component } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.html',
  styleUrl: './create.css',
  standalone: false,
})
export class Create {
  title = '';
  description = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {}

  onSubmit() {
    const data = {
      title: this.title,
      description: this.description,
    };

    this.taskService.createTask(data).subscribe({
      next: (res) => {
        console.log('Task created:', res);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Error creating task:', err);
      },
    });
  }
}
