import { Component, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { TaskListComponent } from "./task-list/task-list.component";
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DateComponent } from '../date/date.component';


@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [TaskListComponent, FormsModule, NgIf, DateComponent],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit {
@Output() add = new EventEmitter<{ title: string,  description: string, fromDate: string, tillDate: string, client:string, type:string, endDate:string, status:string}>()

clientName:string='Select Client'
type:string='Rate Type'
status:string ='Payment Status';
fromDate:string ='dd/mm/yy'
tillDate:string='dd/mm/yy';

  task={
  title: '',
  description: '',
  fromDate: '',
  tillDate: '', 
  client:'',
  type:'',
  endDate:'',
  status:'',

} 
tasksList: any[] = []; 

ngOnInit(){
this.getFromLocalStorage()
}
   OnSelectedClient(client:string){
         this.task.client =  client;
          this.clientName=client;               
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
   
      onFromDateReceived(fromDate: string) {
        this.task.fromDate = fromDate;
      }
    
      onTillDateReceived(tillDate: string) {
        this.task.tillDate = tillDate;
      }
      onEndDateRecieved(endDate:string){
        this.task.endDate=endDate
      }
      onSubmit(form:NgForm){
       const formValues=form.value
        formValues.client = this.task.client

        this.tasksList.push(this.task);
        this.add.emit(this.task);
        this.saveToLocalStrorage()

        this.resetForm();
      }
      saveToLocalStrorage(){
       let stringJSON= JSON.stringify(this.tasksList);
        localStorage.setItem('todoList', stringJSON)
      }


      getFromLocalStorage(){
        let itemJSONstring=localStorage.getItem('todoList')
        if(itemJSONstring !=null){
          this.tasksList=JSON.parse(itemJSONstring)
        }
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
            status:''
          };
this.clientName='Select Client'
this.type='Rate Type'
this.status='Payment Status'
        }

     
        }
  
