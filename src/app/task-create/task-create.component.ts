import { Component, EventEmitter, Output, } from '@angular/core';
import { TaskListComponent } from "./task-list/task-list.component";
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DataService } from '../shared/data.service';
import { Student } from '../model/student';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [TaskListComponent, FormsModule, NgIf, ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {
@Output() add = new EventEmitter<{ title: string, id:string, description: string, fromDate: string, tillDate: string, client:string, type:string, endDate:string, status:string}>()

constructor(private data:DataService){}



client:string='Select Client'
type:string='Rate Type'
status:string ='Status';


  task:Student={
  title: '',
  description: '',
  fromDate: '',
  tillDate: '', 
  client:'',
  type:'',
  endDate:'',
  status:'',
  id:'',

} 


   OnSelectedClient(client:string){
         this.task.client =  client;
          this.client=client;               
            }

            checkStatus(status:string){
              this.task.status=status
              this.status=status
              //the second one update the button on application 
        }

            OnSelectedType(type:string){
              this.task.type=type
              this.type=type
            }

      onSubmit(form: NgForm) {
        const formValues = form.value;
        formValues.client = this.task.client;
        this.data.addTask(this.task)
          this.add.emit(this.task);  // Emit task for parent component
            form.resetForm()  // Reset form after submission
        
      }      


        resetForm(){
          this.task = {
            title: '',
            description: '',
            fromDate: '',
            tillDate: '',
            client:'',
            type:'',
            endDate:'',
            status:'',
            id:''
          };
this.client='Select Client'
this.type='Rate Type'
this.status='Payment Status'
        }

     
        }
  
