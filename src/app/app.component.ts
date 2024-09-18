import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { TaskCreateComponent } from "./task-create/task-create.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from "./task-create/task-list/task-list.component";
import { BrowserModule } from '@angular/platform-browser';
import { DateComponent } from './date/date.component';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyAvM9dNH9sXHpxxe4vh9RFSylO146lACJ4",
//   authDomain: "ksingh-taskmanager.firebaseapp.comm",
//   projectId: "ksingh-taskmanager",
//   storageBucket: "ksingh-taskmanager.appspot.com",
//   messagingSenderId: "822476267981",
//   appId: "1:822476267981:web:471164612041306290e484",
//   measurementId: "G-JGZ1R5S84B"
// };
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

