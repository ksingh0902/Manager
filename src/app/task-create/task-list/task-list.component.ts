import { NgFor } from '@angular/common';
import { Component,  Input } from '@angular/core';
import { TaskCreateComponent } from '../task-create.component';

interface tasks {
  title: string;
  description: string;
  dueDate: string;
}
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, TaskCreateComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() items: { title: string; description: string; fromDate: string, tillDate: string, client:string, type:string, endDate:string, status:string}[] = [];

completeItem(item: any) {
  const index = this.items.indexOf(item);
  if (index > -1) {
      this.items.splice(index, 1);
  }
}
}
