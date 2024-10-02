import { Injectable } from '@angular/core';
import{ Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc }  from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore : Firestore) { }

addTask(task:Student){
  const tasksCollection= collection(this.firestore, 'Students')
  return addDoc(tasksCollection, task); 
}

//get all students
getAllStudents(): Observable<Student[]> {
  const studentsCollection = collection(this.firestore, 'Students'); // Get reference to the collection
  return collectionData(studentsCollection, { idField: 'id' }) as Observable<Student[]>; // Get data and include document ID
}


// delete students
deleteStudent(student: Student) {
  const studentDocRef = doc(this.firestore, `Students/${student.id}`); // Reference the document by its ID
  return deleteDoc(studentDocRef); // Delete the document
}

updateStudent(student:Student){
  this.deleteStudent(student);
  this.addTask(student)
}

}
