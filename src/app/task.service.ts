import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new BehaviorSubject<Array<any>>([]); // To store tasks as an observable stream
  tasks$ = this.tasks.asObservable(); // Exposing tasks as observable for components to subscribe

  constructor() { }

  // Add task
  addTask(task: any) {
    const currentTasks = this.tasks.value;
    this.tasks.next([...currentTasks, task]); // Add new task to the list and emit the updated value
  }

  // Get tasks
  getTasks() {
    return this.tasks.value;
  }

    // Reset task form data
    resetTask() {
      return {
        title: '',
        description: '',
        fromDate: '',
        tillDate: '',
        client: '',
        type: '',
        endDate: '',
        status: '',
        id: '',
      }
    }
}
