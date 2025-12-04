import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
   tasks: any[] = [
   
   ];
  filteredTasks: any[] = [];
  selectedTask: any = null;
  filterStatus: string = 'all';

  taskForm = {
    title: '',
    description: '',
  };

  constructor(private taskService: TaskService,
    private authservices:AuthService
  ) {}

  ngOnInit(): void {
  this.filteredTasks = this.tasks;

    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res;
      this.filteredTasks = this.tasks;
    });
  }

  addTask() {
    if (!this.taskForm.title) return alert('Task title is required');
      const userId = localStorage.getItem('userId');
   const taskData = {
    ...this.taskForm,
    userId: userId
  };
    this.taskService.addTask(taskData).subscribe(() => {
      this.taskForm = { title: '', description: '' };
      this.getTasks();
    });
  }

  editTask(task: any) {
    this.selectedTask = { ...task };
  }

  updateTask() {
    this.taskService.updateTask(this.selectedTask._id, this.selectedTask).subscribe(() => {
      this.selectedTask = null;
      this.getTasks();
    });
  }

  deleteTask(id: string) {
    if (confirm('Are you sure to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.getTasks());
    }
  }

  markCompleted(task: any) {
    task.status = 'completed';
    this.taskService.updateTask(task._id, task).subscribe(() => this.getTasks());
  }

  filterTasks(status: string) {
    this.filterStatus = status;
    if (status === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(t => t.status === status);
    }
  }
  logout()
  {
   this.authservices.logout()
  }


}
