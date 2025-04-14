import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  template: `
    <header class="flex items-center justify-between bg-[#f5f5f5] p-4">
      <div class="p-0">
        <h1 class="text-md text-[#0a0a0a]">Hello, Client</h1>
        <p class="text-xs text-[#757575]">Have a nice day</p>
      </div>
      <div class="flex items-center">
        <mat-icon>{{ 'notifications' }}</mat-icon>
        <!-- vertical separator -->
        <div class="mx-6 h-12 border-l border-gray-300"></div>
        <!-- card -->
        <div class="flex h-10 w-32 items-center justify-between">
          <div>
            <h1 class="text-sm text-[#0a0a0a]">Client Define</h1>
            <p class="text-xs text-[#757575]">Admin</p>
          </div>
          <mat-icon>{{ 'keyboard_arrow_down' }}</mat-icon>
        </div>
      </div>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {}
