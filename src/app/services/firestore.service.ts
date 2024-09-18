import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private tasksCollection = this.firestore.collection('tasks');

  constructor(private firestore: AngularFirestore) {}

  // Add a new task to Firestore
  addTask(task: any): Promise<any> {
    return this.tasksCollection.add(task);
  }

  // Get all tasks from Firestore
  getTasks(): Observable<any[]> {
    return this.tasksCollection.valueChanges({ idField: 'id' });
  }

  // Optionally, delete a task by ID
  deleteTask(taskId: string): Promise<void> {
    return this.tasksCollection.doc(taskId).delete();
  }
}
