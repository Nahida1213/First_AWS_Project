import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    user = {
    username: '',
    email: '',
    password: ''
  };
  constructor(private authService:AuthService)
  {

  }

    register() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      alert('All fields are required');
      return;
    }

    this.authService.register(this.user).subscribe({
      next: (res) => {
        alert('Registration successful!');
        console.log(res);
      },
      error: (err) => {
        alert('Registration failed. Try again!');
        console.error(err);
      }
    });
  }

}
