import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user_md';
import { Permission } from '../../models/permission_md';
import { Role } from '../../models/role_md';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule],
  template: `
    <div>
      <h1 class="mb-5 text-2xl font-bold text-[#4A85F6]">Users Dashboard</h1>
      <!-- searchbox with magnifying glass inside -->
      <div class="flex items-center">
        <div
          class="relative flex h-9 w-[60%] items-center rounded-xl bg-[#ffffff]"
        >
          <mat-icon class="absolute left-3 text-[#4A85F6]">search</mat-icon>
          <input
            type="text"
            placeholder="Search"
            class="w-full pl-12 focus:outline-none"
          />
        </div>
        <div class="ml-6 flex w-[40%] items-center justify-evenly">
          <button
            class="text-md flex h-11 w-30 items-center justify-center rounded-lg bg-[#4A85F6] text-white hover:bg-[#86a6e2]"
          >
            Add User
            <mat-icon class="ml-3">add</mat-icon>
          </button>
          <div
            class="cursor-pointer rounded-md p-2 transition hover:bg-white hover:shadow"
          >
            <button class="text-md flex items-center text-[#404040]">
              Sort by
              <mat-icon class="ml-2">keyboard_arrow_down</mat-icon>
            </button>
          </div>
          <div
            class="cursor-pointer rounded-md p-2 transition hover:bg-white hover:shadow"
          >
            <button class="text-md flex items-center text-[#404040]">
              Saved search
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
      <!-- table of users -->
      <div class="overflow-hidden rounded-lg bg-white shadow-sm">
        <!-- Table Header -->
        <div
          class="grid grid-cols-4 bg-gray-100 px-4 py-3 text-sm text-gray-500"
        >
          <div>Name</div>
          <div></div>
          <div>Create Date</div>
          <div>Action</div>
        </div>

        <!-- Table Rows -->
        <div
          *ngFor="let user of users"
          class="grid grid-cols-4 items-center border-b px-4 py-4"
        >
          <div>
            <div class="font-medium text-gray-800">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="text-xs text-gray-500">{{ user.email }}</div>
          </div>
          <div>
            <span
              class="inline-block w-20 rounded-full bg-blue-500 px-3 py-2 text-center text-sm text-white"
            >
              {{ user.role.name }}
            </span>
          </div>
          <div class="text-sm text-gray-600">
            {{ user.createdAt | date: 'd MMM, yyyy' }}
          </div>
          <div class="flex space-x-2">
            <button class="text-blue-500 hover:text-blue-700">
              <mat-icon>edit</mat-icon>
            </button>
            <button class="text-red-500 hover:text-red-700">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DashboardComponent {
  users: Array<User> = [
    new User(
      'u1',
      'jdoe',
      'John',
      'Doe',
      'jdoe@example.com',
      new Date('2023-01-01'),
      new Role('r1', 'Admin'),
      [
        new Permission('p1', 'Users', true, true, true),
        new Permission('p2', 'Settings', true, false, false),
      ],
      '+1234567890',
    ),
    new User(
      'u2',
      'asmith',
      'Alice',
      'Smith',
      'asmith@example.com',
      new Date('2023-02-10'),
      new Role('r2', 'Editor'),
      [
        new Permission('p3', 'Documents', true, true, false),
        new Permission('p4', 'Photos', true, false, false),
      ],
      '+1987654321',
    ),
    new User(
      'u3',
      'bwayne',
      'Bruce',
      'Wayne',
      'bwayne@example.com',
      new Date('2023-03-05'),
      new Role('r3', 'Viewer'),
      [new Permission('p5', 'Reports', true, false, false)],
    ),
    new User(
      'u4',
      'ckent',
      'Clark',
      'Kent',
      'ckent@example.com',
      new Date('2023-04-20'),
      new Role('r1', 'Admin'),
      [
        new Permission('p6', 'Dashboard', true, true, true),
        new Permission('p7', 'Analytics', true, true, true),
      ],
      '+1122334455',
    ),
    new User(
      'u5',
      'dprince',
      'Diana',
      'Prince',
      'dprince@example.com',
      new Date('2023-05-18'),
      new Role('r2', 'Editor'),
      [new Permission('p8', 'Articles', true, true, true)],
    ),
    new User(
      'u6',
      'p.parker',
      'Peter',
      'Parker',
      'pparker@example.com',
      new Date('2023-06-22'),
      new Role('r3', 'Viewer'),
      [new Permission('p9', 'Media', true, false, false)],
      '+1098765432',
    ),
  ];
}
