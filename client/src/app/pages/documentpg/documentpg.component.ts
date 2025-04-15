import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-documentpg',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div>
      <h1 class="mb-5 text-2xl font-bold text-[#4A85F6]">Documents</h1>
      <div class="flex items-center">
        <div
          class="relative flex h-9 w-[90%] items-center rounded-xl bg-[#ffffff]"
        >
          <mat-icon class="absolute left-3 text-[#4A85F6]">search</mat-icon>
          <input
            type="text"
            placeholder="Search"
            class="w-full pl-12 focus:outline-none"
          />
        </div>
        <div class="ml-6 flex w-[20%] items-center justify-evenly">
          <div
            class="cursor-pointer rounded-md p-2 transition hover:bg-white hover:shadow"
          >
            <button class="text-md flex items-center text-[#404040]">
              Sort by
              <mat-icon class="ml-2">keyboard_arrow_down</mat-icon>
            </button>
          </div>

          <div
            class="flex cursor-pointer items-center rounded-md p-2 transition hover:bg-white hover:shadow"
          >
            <mat-icon class="">tune</mat-icon>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DocumentpgComponent {}
