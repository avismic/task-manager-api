import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task } from '../../models/task.model';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = `${environment.apiBaseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(params?: any): Observable<Page<Task>> {
    return this.http.get<Page<Task>>(this.baseUrl, { params });
  }

  createTask(data: { title: string; description: string }) {
    return this.http.post(this.baseUrl, data);
  }

  getTaskById(id: number) {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  updateTask(id: number, data: { title: string; description: string }) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  toggleTask(id: number) {
    return this.http.patch(`${this.baseUrl}/${id}/toggle`, {});
  }
}
