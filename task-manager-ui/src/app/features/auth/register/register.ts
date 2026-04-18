import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.register(data).subscribe({
      next: () => {
        console.log('User registered');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Register error:', err);
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
