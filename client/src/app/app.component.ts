import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="flex h-screen bg-[#f5f5f5]">
      <app-sidebar></app-sidebar>

      <div class="flex flex-1 flex-col px-5">
        <app-header></app-header>
        <div class="flex-1 overflow-auto p-4">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'client';
}
