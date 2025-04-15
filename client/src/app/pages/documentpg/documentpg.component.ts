import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-documentpg',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div>
      <!-- header -->
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
      <!-- below header -->
      <div class="my-3 flex w-full items-center justify-between">
        <div class="flex h-11 text-center text-[#4A85F6]">
          <button
            class="mr-2 rounded-md border-2 border-[#DDDFE1] p-2 text-[#4A85F6] hover:bg-[#4A85F6] hover:text-white"
          >
            <mat-icon>home</mat-icon></button
          ><button
            class="mx-2 rounded-md border-2 border-[#DDDFE1] p-2 text-[#4A85F6] hover:bg-[#4A85F6] hover:text-white"
          >
            <mat-icon>zoom_out_map</mat-icon></button
          ><button
            class="mx-2 rounded-md border-2 border-[#DDDFE1] p-2 text-[#4A85F6] hover:bg-[#4A85F6] hover:text-white"
          >
            <mat-icon>book</mat-icon></button
          ><button
            class="mx-2 rounded-md border-2 border-[#DDDFE1] p-2 text-[#4A85F6] hover:bg-[#4A85F6] hover:text-white"
          >
            <mat-icon>print</mat-icon></button
          ><button
            class="ml-2 rounded-md border-2 border-[#DDDFE1] p-2 text-[#4A85F6] hover:bg-[#4A85F6] hover:text-white"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>

        <div class="flex h-11 items-center space-x-3 rounded-md">
          <!-- First Dropdown -->
          <div class="relative">
            <select
              class="w-50 appearance-none rounded-md border border-gray-300 px-4 py-2.5 pr-8 text-sm text-gray-700 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600"
            >
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.193l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <!-- Second Dropdown -->
          <div class="relative">
            <select
              class="w-50 appearance-none rounded-md border border-gray-300 px-4 py-2.5 pr-8 text-sm text-gray-700 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Documents</option>
              <option>Invoices</option>
              <option>Reports</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600"
            >
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.193l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <button
            class="h-10.5 rounded-md bg-[#4A85F6] p-2 text-white shadow hover:bg-[#3a6ddc]"
          >
            <mat-icon>add</mat-icon>
          </button>
        </div>
      </div>
      <!-- document content -->
    </div>
  `,
  styles: ``,
})
export class DocumentpgComponent {}
