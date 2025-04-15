import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, MatIconModule],
  template: `
    <div class="h-screen w-64 border-r border-gray-200 bg-white">
      <div class="p-8">
        <h1 class="text-lg font-bold">YOURLOGO</h1>
      </div>
      <div class="flex flex-col">
        <nav>
          <a
            *ngFor="let item of navItems"
            [routerLink]="item.route"
            routerLinkActive="text-[#4A85F6] border-r-4 border-[#4A85F6]"
            class="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50"
          >
            <span class="mr-3 text-gray-500">
              <mat-icon>{{ item.icon }}</mat-icon>
            </span>
            <span>{{ item.label }}</span>
          </a>
        </nav>
        <nav class="mt-8">
          <a
            *ngFor="let item of navItems2"
            [routerLink]="item.route"
            routerLinkActive="text-[#4A85F6] border-r-4 border-[#4A85F6]"
            class="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50"
          >
            <span class="mr-3 text-gray-500">
              <mat-icon>{{ item.icon }}</mat-icon>
            </span>
            <span>{{ item.label }}</span>
          </a>
        </nav>
      </div>
    </div>
  `,
  styles: ``,
})
export class SidebarComponent {
  navItems = [
    { label: 'Dashboard', icon: 'keyboard_command_key', route: '/dashboard' },
    { label: 'Users', icon: 'bar_chart', route: '/users' },
    { label: 'Documents', icon: 'description', route: '/documents' },
    { label: 'Photos', icon: 'photo', route: '/photos' },
    { label: 'Hierarchy', icon: 'account_tree', route: '/hierarchy' },
  ];
  navItems2 = [
    { label: 'Message', icon: 'message', route: '/messages' },
    { label: 'Help', icon: 'help', route: '/help' },
    { label: 'Setting', icon: 'settings', route: '/settings' },
  ];
}
