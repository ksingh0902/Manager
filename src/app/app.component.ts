import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { TaskCreateComponent } from "./task-create/task-create.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from "./task-create/task-list/task-list.component";
import { BrowserModule } from '@angular/platform-browser';
import { DateComponent } from './date/date.component';

imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  // AngularFireModule.initializeApp(firebaseConfig),  // Initialize Firebase here
  // AngularFirestoreModule,  // Firestore module
]


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TaskCreateComponent, FormsModule, TaskListComponent, DateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: { title: string; description: string; fromDate: string, tillDate: string, client:string, type:string, id:string, endDate:string, status:string  }[] = [];

  onAddTask(dataOfList: { title: string; description: string; fromDate: string, tillDate: string, client:string, type:string, endDate:string, status:string, id:string}) {
    this.tasks.unshift(dataOfList); // after recieveing data of lists from child and now Add the new tasks to the list and will send to another child
  }
  
  
}

