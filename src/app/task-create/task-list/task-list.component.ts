import { NgFor } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { TaskCreateComponent } from '../task-create.component';
import { DatePipe } from '@angular/common';
import { Student } from '../../model/student';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, TaskCreateComponent, DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  @Input() list: Student[] = []; // Array to hold tasks from Firestore
  title: string = '';
  description: string = '';
  fromDate: string = '';
  tillDate: string = '';
  client: string = '';
  type: string = '';
  endDate: string = '';
  status: string = '';
  id: string = '';

  constructor(private data: DataService) {}

  ngOnInit():void {
    this.getAllStudents()
    }

  getAllStudents() {
    this.data.getAllStudents().subscribe(
      (res:Student[]) => {
      this.list = res
    }, err=>{
      alert('Error while fecthing the data')
    });
  }


  deleteStudent(item: Student) {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      this.data.deleteStudent(item).then(() => {
        // Optionally, you can provide a success message
        alert(`${item.title} has been deleted successfully.`);
      }).catch((error) => {
        // Handle any errors that may occur
        console.error('Error deleting student:', error);
        alert('There was an error deleting the student. Please try again.');
      });
    }
  }

  // completeItem(item: any) {
  //   const index = this.list.indexOf(item);
  //   if (index > -1) {
  //     this.list.splice(index, 1);
  //   }
  // }
}
// completeItem(item: any) {
//   const index = this.items.indexOf(item);
//   if (index > -1) {
//       this.items.splice(index, 1);
//   }
// }
// }
