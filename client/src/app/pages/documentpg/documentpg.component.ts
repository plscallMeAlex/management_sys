import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Document {
  id: number;
  title: string;
  date: string;
  description: string;
}

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
      <div class="mt-4 w-full rounded-xl bg-white p-4">
        <h2 class="mb-2 text-lg font-medium">List of documents</h2>
        <p class="mb-4 text-sm text-gray-500">Lorem ipsum dolor sit amet</p>

        <!-- line -->
        <div class="mb-4 h-[1px] w-full bg-gray-200"></div>
        <!-- Document List Table -->
        <div class="w-full">
          <div
            *ngFor="let doc of documents"
            class="mb-3 flex items-center border-b border-gray-200 py-4"
          >
            <div class="mr-4 flex-shrink-0">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-500"
              >
                <mat-icon>description</mat-icon>
              </div>
            </div>
            <div class="flex flex-grow items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-800">{{ doc.title }}</h3>
                <p class="text-sm text-gray-500">{{ doc.date }}</p>
              </div>
              <div class="hidden text-sm text-gray-600 md:block">
                {{ doc.description }}
              </div>
              <div class="flex items-center space-x-2">
                <button class="rounded p-1 text-blue-500 hover:bg-blue-50">
                  <mat-icon>edit</mat-icon>
                </button>
                <button class="rounded p-1 text-blue-500 hover:bg-blue-50">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DocumentpgComponent {
  documents: Document[] = [
    {
      id: 1,
      title: 'Annual Report 2024',
      date: 'April 1, 2024',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
      id: 2,
      title: 'Project Proposal',
      date: 'April 5, 2024',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
      id: 3,
      title: 'Marketing Strategy',
      date: 'April 8, 2024',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
      id: 4,
      title: 'Financial Analysis',
      date: 'April 12, 2024',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
      id: 5,
      title: 'Client Feedback',
      date: 'April 15, 2024',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
      id: 6,
      title: 'Meeting Notes',
      date: 'April 20, 2024',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
  ];
}
