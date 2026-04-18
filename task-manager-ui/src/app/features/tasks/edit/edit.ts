import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../models/task.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.html',
  styleUrl: './edit.css',
  standalone: false,
})
export class Edit implements OnInit {
  taskId!: number;
  task!: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (res) => {
        console.log('Task fetched:', res);
        this.task = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching task:', err);
      },
    });
  }

  onSubmit() {
    const data = {
      title: this.task.title,
      description: this.task.description,
    };

    this.taskService.updateTask(this.taskId, data).subscribe({
      next: (res) => {
        console.log('Task updated:', res);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Error updating task:', err);
      },
    });
  }
}
