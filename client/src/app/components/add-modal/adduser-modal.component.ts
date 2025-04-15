import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../models/role_md';
import { Permission } from '../../models/permission_md';
import { AdduserModalService } from '../../services/adduser-modal/adduser-modal.service';

@Component({
  selector: 'app-adduser-modal',
  imports: [MatIconModule, CommonModule, FormsModule, ReactiveFormsModule],
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

        <form [formGroup]="userForm" (ngSubmit)="addUser()">
          <div class="px-6 pt-6">
            <div class="mb-4">
              <label class="mb-1 block text-sm font-medium"
                >User ID <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                formControlName="userId"
                placeholder="User ID *"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                [ngClass]="{ 'border-red-500': isFieldInvalid('userId') }"
              />
              <div
                *ngIf="isFieldInvalid('userId')"
                class="mt-1 text-sm text-red-500"
              >
                User ID is required
              </div>
            </div>

            <div class="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium"
                  >First Name <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  formControlName="firstName"
                  placeholder="First Name *"
                  class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  [ngClass]="{ 'border-red-500': isFieldInvalid('firstName') }"
                />
                <div
                  *ngIf="isFieldInvalid('firstName')"
                  class="mt-1 text-sm text-red-500"
                >
                  First Name is required
                </div>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium"
                  >Last Name <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  formControlName="lastName"
                  placeholder="Last Name *"
                  class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  [ngClass]="{ 'border-red-500': isFieldInvalid('lastName') }"
                />
                <div
                  *ngIf="isFieldInvalid('lastName')"
                  class="mt-1 text-sm text-red-500"
                >
                  Last Name is required
                </div>
              </div>
            </div>

            <div class="mb-4 grid grid-cols-3 gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium"
                  >Email ID <span class="text-red-500">*</span></label
                >
                <input
                  type="email"
                  formControlName="email"
                  placeholder="Email ID *"
                  class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  [ngClass]="{ 'border-red-500': isFieldInvalid('email') }"
                />
                <div
                  *ngIf="isFieldInvalid('email')"
                  class="mt-1 text-sm text-red-500"
                >
                  Valid email is required
                </div>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium">Mobile No</label>
                <input
                  type="text"
                  formControlName="mobile"
                  placeholder="Mobile No"
                  class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium">Role</label>
                <select
                  formControlName="role"
                  class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  (change)="onRoleChange()"
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
                  formControlName="username"
                  placeholder="Username *"
                  class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  [ngClass]="{ 'border-red-500': isFieldInvalid('username') }"
                  (blur)="checkUsername()"
                />
                <div
                  *ngIf="isFieldInvalid('username')"
                  class="mt-1 text-sm text-red-500"
                >
                  Username is required
                </div>
                <div *ngIf="usernameTaken" class="mt-1 text-sm text-red-500">
                  Username is already taken
                </div>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium"
                  >Password <span class="text-red-500">*</span></label
                >
                <input
                  type="password"
                  formControlName="password"
                  placeholder="Password *"
                  class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  [ngClass]="{ 'border-red-500': isFieldInvalid('password') }"
                />
                <div
                  *ngIf="isFieldInvalid('password')"
                  class="mt-1 text-sm text-red-500"
                >
                  Password is required
                </div>
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium"
                  >Confirm Password <span class="text-red-500">*</span></label
                >
                <input
                  type="password"
                  formControlName="confirmPassword"
                  placeholder="Confirm Password *"
                  class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  [ngClass]="{
                    'border-red-500': isFieldInvalid('confirmPassword'),
                  }"
                />
                <div
                  *ngIf="userForm.errors?.['passwordMismatch']"
                  class="mt-1 text-sm text-red-500"
                >
                  Passwords do not match
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex h-16 items-center bg-[#EFF4FA] font-medium text-gray-600"
          >
            <div class="w-1/4 text-center">Module Permission</div>
            <div class="w-1/4 text-center">Read</div>
            <div class="w-1/4 text-center">Write</div>
            <div class="w-1/4 text-center">Delete</div>
          </div>
          <div class="mb-2 w-full px-2">
            <div
              *ngFor="let permission of permissions; let i = index"
              class="flex items-center border-b border-gray-200 py-3"
            >
              <div class="w-1/4">{{ permission.name }}</div>
              <div class="flex w-1/4 justify-center">
                <input
                  type="checkbox"
                  [formControlName]="'read_' + i"
                  class="h-5 w-5 text-blue-600"
                />
              </div>
              <div class="flex w-1/4 justify-center">
                <input
                  type="checkbox"
                  [formControlName]="'write_' + i"
                  class="h-5 w-5 text-blue-600"
                />
              </div>
              <div class="flex w-1/4 justify-center">
                <input
                  type="checkbox"
                  [formControlName]="'delete_' + i"
                  class="h-5 w-5 text-blue-600"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4 border-t p-4">
            <button
              type="button"
              class="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
              (click)="close()"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              [disabled]="userForm.invalid || usernameTaken"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class AddModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<any>();

  permissions: Permission[] = [];
  roles: Role[] = [];
  userForm!: FormGroup;
  usernameTaken = false;

  constructor(
    private adduserModalService: AdduserModalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.permissions = this.adduserModalService.permissions;
    this.roles = this.adduserModalService.roles;
    this.initForm();
  }

  initForm(): void {
    // Create base form controls
    const formControls: any = {
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      role: [null],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    };

    // Add dynamic form controls for permissions
    this.permissions.forEach((permission, index) => {
      formControls[`read_${index}`] = [permission.isReadable];
      formControls[`write_${index}`] = [permission.isWritable];
      formControls[`delete_${index}`] = [permission.isDeletable];
    });

    this.userForm = this.fb.group(formControls, {
      validators: this.passwordMatchValidator,
    });
  }

  // Password match custom validator
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Check if a field is invalid and was touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return (field?.invalid && (field?.dirty || field?.touched)) || false;
  }

  // Check if username is already taken
  checkUsername(): void {
    const username = this.userForm.get('username')?.value;
    if (username) {
      this.usernameTaken = this.adduserModalService.isUsernameTaken(username);
    }
  }

  // Update permissions when role changes
  onRoleChange(): void {
    const selectedRole = this.userForm.get('role')?.value;
    if (selectedRole) {
      const defaultPermissions =
        this.adduserModalService.getDefaultPermissionsForRole(selectedRole.id);

      // Update permission checkboxes
      defaultPermissions.forEach((permission, index) => {
        this.userForm.get(`read_${index}`)?.setValue(permission.isReadable);
        this.userForm.get(`write_${index}`)?.setValue(permission.isWritable);
        this.userForm.get(`delete_${index}`)?.setValue(permission.isDeletable);
      });
    }
  }

  // Add user method that will be called on form submission
  addUser(): void {
    if (this.userForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Extract form values
    const formValues = this.userForm.value;

    // Prepare permissions data
    const userPermissions = this.permissions.map((permission, index) => {
      return new Permission(
        permission.id,
        permission.name,
        formValues[`read_${index}`],
        formValues[`write_${index}`],
        formValues[`delete_${index}`],
      );
    });

    // Create payload using the service
    const newUser = this.adduserModalService.createUser({
      userId: formValues.userId,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      mobile: formValues.mobile,
      role: formValues.role,
      username: formValues.username,
      password: formValues.password,
      permissions: userPermissions,
    });

    // Emit event that user was added
    this.userAdded.emit(newUser);

    // Close modal after successful submission
    this.close();
  }

  close() {
    this.userForm.reset();
    this.usernameTaken = false;
    this.closeModal.emit();
  }
}
