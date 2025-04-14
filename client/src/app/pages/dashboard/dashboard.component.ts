import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { User } from '../../models/user_md';
import { AddModalComponent } from '../../components/add-modal/adduser-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, AddModalComponent],
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
            (click)="openUserModal()"
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
      <div class="mt-6 overflow-hidden rounded-lg bg-white shadow-sm">
        <!-- Table Header -->
        <div class="bg-white px-4 py-3">
          <h1 class="text-lg">List Users</h1>
        </div>
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
          *ngFor="let user of displayedUsers"
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

      <!-- Page selection -->
      <div class="mt-6 flex items-center justify-center">
        <label class="px-3 text-[#717171]">Items per page:</label>
        <!-- select option from 1-6 -->
        <select
          [(ngModel)]="itemsPerPage"
          (change)="onItemsPerPageChange()"
          class="ml-2 rounded-md border border-[#717171] bg-white p-1 px-2 text-[#717171]"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <div class="px-3 text-sm text-[#717171]">
          {{ startUser + 1 }}-{{ endUser }} of
          {{ totalUsers }}
        </div>
        <div class="flex items-center px-3 text-[#717171]">
          <mat-icon
            class="cursor-pointer"
            [ngClass]="{
              'text-[#717171]': canGoBackward,
              'text-gray-300': !canGoBackward,
            }"
            (click)="prevPage()"
            >chevron_left</mat-icon
          >
          <mat-icon
            class="cursor-pointer"
            [ngClass]="{
              'text-[#717171]': canGoForward,
              'text-gray-300': !canGoForward,
            }"
            (click)="nextPage()"
            >chevron_right</mat-icon
          >
        </div>
      </div>
      <app-adduser-modal
        [isOpen]="isUserModalOpen"
        (closeModal)="closeUserModal()"
      ></app-adduser-modal>
    </div>
  `,
  styles: [
    `
      .grid-cols-4 {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 0.5fr;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  displayedUsers: User[] = [];
  itemsPerPage: number = 6;
  totalUsers: number = 0;
  startUser: number = 0;
  endUser: number = 0;
  canGoForward: boolean = false;
  canGoBackward: boolean = false;
  isUserModalOpen: boolean = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Subscribe to the displayed users from the service
    this.dashboardService.displayedUsers$.subscribe((users) => {
      this.displayedUsers = users;
    });

    // Get total users count
    this.dashboardService.users$.subscribe((users) => {
      this.totalUsers = users.length;
    });

    // Initialize pagination
    this.updatePaginationInfo();
  }

  updatePaginationInfo(): void {
    this.startUser = this.dashboardService.startUser;
    this.endUser = this.dashboardService.endUser;
    this.itemsPerPage = this.dashboardService.itemsPerPage;
    this.canGoForward = this.dashboardService.canGoForward();
    this.canGoBackward = this.dashboardService.canGoBackward();
  }

  onItemsPerPageChange(): void {
    this.dashboardService.setItemsPerPage(this.itemsPerPage);
    this.updatePaginationInfo();
  }

  nextPage(): void {
    if (this.canGoForward) {
      this.dashboardService.nextPage();
      this.updatePaginationInfo();
    }
  }

  prevPage(): void {
    if (this.canGoBackward) {
      this.dashboardService.prevPage();
      this.updatePaginationInfo();
    }
  }

  openUserModal(): void {
    this.isUserModalOpen = true;
  }

  closeUserModal(): void {
    this.isUserModalOpen = false;
  }
}
