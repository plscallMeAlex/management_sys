import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../models/role_md';

@Component({
  selector: 'app-add-modal',
  imports: [MatIconModule, CommonModule, FormsModule],
  standalone: true,
  template: `
    <div
      *ngIf="isOpen"
      class="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
    >
      <div class="w-full max-w-4xl rounded-md bg-white shadow-lg">
        <div class="flex items-center justify-between border-b p-4">
          <h2 class="text-xl font-medium">Add User</h2>
          <button class="text-gray-500 hover:text-gray-700" (click)="close()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <div class="p-6">
          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium"
              >User ID <span class="text-red-500">*</span></label
            >
            <input
              type="text"
              placeholder="User ID *"
              class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div class="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium"
                >First Name <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                placeholder="First Name *"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium"
                >Last Name <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                placeholder="Last Name *"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div class="mb-4 grid grid-cols-3 gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium"
                >Email ID <span class="text-red-500">*</span></label
              >
              <input
                type="email"
                placeholder="Email ID *"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">Mobile No</label>
              <input
                type="text"
                plcaceholder="Mobile No"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">Role</label>
              <select
                [(ngModel)]="selectedRole"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option [ngValue]="null" disabled>Select Role Type</option>
                <option *ngFor="let role of roles" [ngValue]="role">
                  {{ role.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-6 grid grid-cols-3 gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium"
                >Username <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                placeholder="Username *"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium"
                >Password <span class="text-red-500">*</span></label
              >
              <input
                type="password"
                placeholder="Password *"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium"
                >Confirm Password <span class="text-red-500">*</span></label
              >
              <input
                type="password"
                placeholder="Confirm Password *"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div class="rounded-md bg-gray-100 p-4">
            <div class="mb-2 flex items-center font-medium text-gray-600">
              <div class="w-1/4">Module Permission</div>
              <div class="w-1/4 text-center">Read</div>
              <div class="w-1/4 text-center">Write</div>
              <div class="w-1/4 text-center">Delete</div>
            </div>

            <div class="flex items-center border-b border-gray-200 py-3">
              <div class="w-1/4">Super Admin</div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" checked class="h-5 w-5 text-blue-600" />
              </div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" checked class="h-5 w-5 text-blue-600" />
              </div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" checked class="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div class="flex items-center border-b border-gray-200 py-3">
              <div class="w-1/4">Admin</div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" checked class="h-5 w-5 text-blue-600" />
              </div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" class="h-5 w-5 text-blue-600" />
              </div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" class="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div class="flex items-center border-b border-gray-200 py-3">
              <div class="w-1/4">Employee</div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" checked class="h-5 w-5 text-blue-600" />
              </div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" class="h-5 w-5 text-blue-600" />
              </div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" class="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div class="flex items-center py-3">
              <div class="w-1/4">Lorem Ipsum</div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" checked class="h-5 w-5 text-blue-600" />
              </div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" checked class="h-5 w-5 text-blue-600" />
              </div>
              <div class="flex w-1/4 justify-center">
                <input type="checkbox" checked class="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-4 border-t p-4">
          <button
            class="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
            (click)="close()"
          >
            Cancel
          </button>
          <button
            class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AddModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  roles: Role[] = [
    new Role('1', 'Super Admin'),
    new Role('2', 'Admin'),
    new Role('3', 'Employee'),
    new Role('4', 'User'),
  ];

  selectedRole: Role | null = null;

  close() {
    this.closeModal.emit();
  }
}
