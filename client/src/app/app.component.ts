import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <!-- <app-sidebar></app-sidebar> -->
    <app-header></app-header>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'client';
}
