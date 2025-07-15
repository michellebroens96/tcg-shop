import { Component } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { Badge } from 'primeng/badge';
import { CommonModule, NgClass } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, Badge, NgClass, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
    },
  ];
}
