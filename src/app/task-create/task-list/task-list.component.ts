import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { TaskCreateComponent } from '../task-create.component';
import { DatePipe } from '@angular/common';
import { Student } from '../../model/student';
import { DataService } from '../../shared/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, TaskCreateComponent, DatePipe, FormsModule, NgIf],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  @Input() list: Student[] = []; // Array to hold tasks from Firestore

  editingIndex: number | null = null; // Track which item is being edited
  tempItem: Student = { // Initialize with default values
    title: '',
    description: '',
    fromDate: '',
    tillDate: '',
    client: '',
    type: '',
    endDate: '',
    status: '',
    id: '', // Add all required properties
    timestamp: 0 // Add default value for timestamp
  }; 


  constructor(private data: DataService) {}

  ngOnInit():void {
    this.getAllStudents()
    }

    getAllStudents() {
      this.data.getAllStudents().subscribe({
        next: (res: Student[]) => {
          this.list = res; // Update the local list with fetched data
        },
        error: (err) => {
          alert('Error while fetching the data');
        }
      });
    }

  deleteStudent(item: Student) {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      this.data.deleteStudent(item).then(() => {
        // Optionally, you can provide a success message
        // alert(`${item.title} has been deleted successfully.`);
      }).catch((error) => {
        // Handle any errors that may occur
        console.error('Error deleting student:', error);
        alert('There was an error deleting the student. Please try again.');
      });
    }
  }

 editStudent(index: number, item: Student) {
    this.editingIndex = index; // Set the index of the item being edited
    this.tempItem = { ...item }; // Copy the current item to tempItem
  }

  saveStudent(index: number, item: Student) {
    this.data.updateStudent(this.tempItem as Student).then(() => {
      this.list[index] = { ...item }; // Update the original list with edited values
      this.editingIndex = null; // Clear the editing index
    }).catch((error:any) => {
      console.error('Error updating student:', error);
      alert('There was an error updating the student. Please try again.');
    });
  }

}
