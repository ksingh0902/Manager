import { NgFor } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { TaskCreateComponent } from '../task-create.component';
import { DatePipe } from '@angular/common';
interface Task {
  title: string;
  description: string;
  fromDate: string;
  tillDate: string;
  client: string;
  type: string;
  endDate: string;
  status: string;
  id:string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, TaskCreateComponent, DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

 @Input() list: Task[] = [];  // Array to hold tasks from Firestore


completeItem(item: any) {
  const index = this.list.indexOf(item);
  if (index > -1) {
      this.list.splice(index, 1);
  }
}
}
// completeItem(item: any) {
//   const index = this.items.indexOf(item);
//   if (index > -1) {
//       this.items.splice(index, 1);
//   }
// }
// }
