import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { TaskCreateComponent } from "./task-create/task-create.component";
import { FormsModule, } from '@angular/forms';
import { TaskListComponent } from "./task-create/task-list/task-list.component";
import { Student } from './model/student';
import { DataService } from './shared/data.service';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TaskCreateComponent, FormsModule, TaskListComponent,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  tasks: Student [] = [];


  noteDescription: string = ''; // This will bind to the textarea
  constructor(private dataService: DataService) { }

  ngOnInit() {
      // Fetch the saved note from Firestore on component initialization
      this.dataService.getNote().then((note: string) => {
        this.noteDescription = note;
      }).catch((error) => {
        console.error('Error fetching note: ', error);
      });
  }

  saveNote() {
    // Save the note to Firestore on input change
    this.dataService.saveNote(this.noteDescription).then(() => {
      console.log('Note saved successfully!');
    }).catch((error) => {
      console.error('Error saving note: ', error);
    });
  }


  onAddTask(dataOfList: Student) {
    this.tasks.unshift(dataOfList); // after recieveing data of lists from child and now Add the new tasks to the list and will send to another child
  }
  
  
}

