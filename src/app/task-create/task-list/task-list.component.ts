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

  filteredList: Student[] = []; // Array to hold filtered tasks
  clients = ['TD Bank', 'BNS (A-G)', 'BNS (H-Z)', 'LBC Tech',]; // Client options for filtering
  selectedClient: string | null = null; // For storing selected client

  // type:string='Rate Type'

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
          this.filteredList = res; // Initialize filtered list
        },
        error: (err) => {
          alert('Error while fetching the data');
        }
      });
    }

    filterTasks() {
      // Start with the original list
      this.filteredList = this.list;
    
      // Apply client filter if selected
      if (this.selectedClient) {
        this.filteredList = this.filteredList.filter(student => student.client === this.selectedClient);
      }
    
      // // Apply type filter if selected
      // if (this.selectedType) {
      //   this.filteredList = this.filteredList.filter(student => student.type === this.selectedType);
      // }
    }
    
    
    selectClient(client: string | null) {
      this.selectedClient = client; // Update selected client
      
      this.filterTasks(); // Filter tasks
    }  
  
    deleteStudent(item: Student, index: number): void {
      if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
        this.data.deleteStudent(item).then(() => {
          // If the deletion from the data source is successful, remove the item from the local list
          this.list.splice(index, 0);
          this.filterTasks(); // Reapply filter after deletion
        }).catch((error: any) => {
          console.error('Error deleting student:', error);
          alert('There was an error deleting the student. Please try again.');
        });
      }
    }

    editStudent(index: number, item: any): void {
      this.editingIndex = index; // Set the editing index to the selected row
      this.tempItem = { ...item }; // Create a copy of the item to edit
    }

  saveStudent(index: number, item: Student) {
    this.data.updateStudent(this.tempItem as Student).then(() => {
      // Update the list immutably
      this.list = this.list.map((student, i) => i === index ? { ...this.tempItem } : student);
      this.editingIndex = null;

      this.tempItem = { // Reset tempItem after saving
        title: '',
        description: '',
        fromDate: '',
        tillDate: '',
        client: '',
        type: '',
        endDate: '',
        status: '',
        id: '',
        timestamp: 0
      };
      this.filterTasks(); // Reapply filter after saving
    }).catch((error: any) => {
      console.error('Error updating student:', error);
      alert('There was an error updating the student. Please try again.');
    });
  }



}
