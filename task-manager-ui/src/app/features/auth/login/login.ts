import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: false,
})
export class Login {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(data).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
 
}
