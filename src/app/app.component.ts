import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { TaskCreateComponent } from "./task-create/task-create.component";
import { FormsModule, } from '@angular/forms';
import { TaskListComponent } from "./task-create/task-list/task-list.component";
import { Student } from './model/student';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TaskCreateComponent, FormsModule, TaskListComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Student [] = [];

  onAddTask(dataOfList: Student) {
    this.tasks.unshift(dataOfList); // after recieveing data of lists from child and now Add the new tasks to the list and will send to another child
  }
  
  
}

