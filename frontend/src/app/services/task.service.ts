import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
   serverUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

 addTask(taskForm:any) {
  return this.http.post(`${this.serverUrl}/tasks/addtask`,taskForm);
  }

  getTasks() {
    const userId=localStorage.getItem('userId')
  return this.http.get(`${this.serverUrl}/tasks/getTask/${userId}`,);
  }
  updateTask(taskId:any,updateTask:any)
  {
     return this.http.post(`${this.serverUrl}/tasks/updateTask/${taskId}`,updateTask); 
  }
  deleteTask(taskId:any)
  {
    return this.http.delete(`${this.serverUrl}/tasks/deleteTask/${taskId}`); 
  
  }
  
}
