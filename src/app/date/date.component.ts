import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent {

@Output() fromDateChanged = new EventEmitter<string>();
@Output() tillDateChanged = new EventEmitter<string>();
@Output() endDate=new EventEmitter<string>();


onFromChange(event: Event){
const inputELement=event.target as HTMLInputElement;
let fromDate=inputELement.value;
this.fromDateChanged.emit(fromDate)

}

onTillChange(event: Event){
  const inputELement=event.target as HTMLInputElement;
  const tillDate=inputELement.value
  this.tillDateChanged.emit(tillDate)
  }

  onEndDate(event:Event){
    const inputELement=event.target as HTMLInputElement;
    const endDate=inputELement.value
    this.endDate.emit(endDate)
    
  }
}
