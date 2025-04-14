import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, MatIconModule],
  template: `
    <div class="w-64 h-screen bg-white border-r border-gray-200">
      <div class="p-8">
        <h1 class="text-lg font-bold">YOURLOGO</h1>
      </div>
      <div class="flex flex-col">
      <nav >
        <a 
          *ngFor="let item of navItems" 
          [routerLink]="item.route"
          routerLinkActive="bg-blue-50 border-l-4 border-blue-500"
          class="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50"
        >
          <span class="mr-3 text-gray-500">
            <mat-icon>{{item.icon}}</mat-icon>
          </span>
          <span>{{ item.label }}</span>
        </a>
      </nav>
      <nav class="mt-8">
        <a 
          *ngFor="let item of navItems2" 
          [routerLink]="item.route"
          routerLinkActive="bg-blue-50 border-l-4 border-blue-500"
          class="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50"
        >
          <span class="mr-3 text-gray-500">
            <mat-icon>{{item.icon}}</mat-icon>
          </span>
          <span>{{ item.label }}</span>
        </a>
      </nav>
      </div>
    </div>
  `,
  styles: ``
})
export class SidebarComponent {
  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Users', icon: 'group', route: '/users' },
    { label: 'Documents', icon: 'description', route: '/documents' },
    { label: 'Photos', icon: 'photo', route: '/photos' },
    { label: 'Hierarchy', icon: 'account_tree', route: '/hierarchy' },
  ];
  navItems2 = [
    { label: 'Message', icon: 'message', route: '/messages' },
    { label: 'Help' , icon: 'help', route: '/help' },
    { label: 'Setting', icon: 'settings', route: '/settings' }
  ]
}