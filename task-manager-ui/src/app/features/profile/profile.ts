import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  name: string | null = null;
  email: string | null = null;

  constructor() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }
}
