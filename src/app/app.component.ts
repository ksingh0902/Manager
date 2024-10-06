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

  // Function to handle the Ctrl + B keydown event using Range and Selection APIs
  onKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'b') {
      event.preventDefault();  // Prevent the default browser behavior for Ctrl+B

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);  // Get the current selection range

        // Only apply bold if there is selected text
        if (!range.collapsed) {
          const selectedText = range.toString();

          // Create a <strong> element to apply bold formatting
          const strongElement = document.createElement('strong');
          strongElement.textContent = selectedText; // Set selected text inside <strong>

          // Replace the selected text with the <strong> element
          range.deleteContents(); // Remove the selected text
          range.insertNode(strongElement); // Insert <strong> element

          // Move the cursor to after the inserted bold text
          range.setStartAfter(strongElement);
          selection.removeAllRanges(); // Clear current selection
          selection.addRange(range);   // Set cursor after the bold text
        }
      }
    }
  }

  // Function to insert a bullet list
  insertBulletList() {
    const selection = window.getSelection();
    const editableDiv = document.getElementById('description');

    // Ensure the selection exists and the editableDiv is focused
    if (selection && editableDiv && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const ul = document.createElement('ul'); // Create a new unordered list

      // Split the selected text into lines and add them to the list
      const lines = range.toString().split('\n');

      // Check if there are any selected lines
      if (lines.length > 0) {
        lines.forEach(line => {
          if (line.trim()) {
            const li = document.createElement('li'); // Create a new list item
            li.textContent = line; // Set the line as the text for the list item
            ul.appendChild(li); // Append the list item to the unordered list
          }
        });

        range.deleteContents(); // Clear the selected text
        range.insertNode(ul); // Insert the unordered list

        // Clear the selection and place the cursor after the list
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      console.warn('No text selected or the editable area is not focused.');
    }
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

