import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, getDoc, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { map } from 'rxjs/operators'; // Use the correct import for operators

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) {}

  // Add a task and return it
  addTask(task: Student): Promise<Student> {
    task.timestamp = Date.now(); 
    const tasksCollection = collection(this.firestore, 'Students');
    return addDoc(tasksCollection, task).then((docRef) => {
      // Return the task with the assigned id
      return { ...task, id: docRef.id };
    });
  }

  // Get all students and ensure new ones appear first
  getAllStudents(): Observable<Student[]> {
    const studentsCollection = collection(this.firestore, 'Students');
    return collectionData(studentsCollection, { idField: 'id' }).pipe(
        map((students: Student[]) => 
            students.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)) // Sort by timestamp in descending order
        )
    ) as Observable<Student[]>;
}


  // Delete students
  deleteStudent(student: Student) {
    const studentDocRef = doc(this.firestore, `Students/${student.id}`); // Reference the document by its ID
    return deleteDoc(studentDocRef); // Delete the document
  }

  updateStudent(student: Student): Promise<void> {
    const studentRef = doc(this.firestore, 'Students', student.id); 
    return updateDoc(studentRef, { // Use updateDoc to update the document
      title: student.title,
      description: student.description,
      fromDate: student.fromDate,
      tillDate: student.tillDate,
      client: student.client,
      type: student.type,
      endDate: student.endDate,
      status: student.status
    }
  
  ); // This returns a Promise
  }

    // Add or update a note
    saveNote(note: string): Promise<void> {
      const notesCollection = collection(this.firestore, 'Notes');
      const noteDocRef = doc(notesCollection, 'sticky-note'); // Assuming one note per user
      return setDoc(noteDocRef, { description: note, timestamp: Date.now() });
    }
  
    getNote(): Promise<string> {
      const noteDocRef = doc(this.firestore, 'Notes', 'sticky-note');
      return getDoc(noteDocRef).then((docSnap) => {
        // If the document exists, return the description; otherwise, return an empty string
        if (docSnap.exists()) {
          return docSnap.data()['description'] || '';
        } else {
          return ''; // Return empty string if no document exists
        }
      });
    }
  
}