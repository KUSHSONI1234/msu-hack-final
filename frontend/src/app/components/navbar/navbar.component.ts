import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive]
})
export class NavbarComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.user-menu')) {
      this.dropdownOpen = false;
    }
  }

  constructor() {
    document.addEventListener('click', (event) => this.closeDropdown(event));
  }
}
