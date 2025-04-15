import { inject, Injectable } from '@angular/core';
import { Permission } from '../../models/permission_md';
import { Role } from '../../models/role_md';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  throwError,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user_md';

@Injectable({
  providedIn: 'root',
})
export class AdduserModalService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5083/api/Users';
  private permissionsSubject = new BehaviorSubject<Permission[]>([]);
  permissions$ = this.permissionsSubject.asObservable();

  roles: Array<Role> = [
    new Role('1', 'Super Admin'),
    new Role('2', 'Admin'),
    new Role('3', 'Employee'),
    new Role('4', 'User'),
  ];

  // Store users in memory for demo purposes
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor() {
    // Fetch permissions when service is initialized
    this.fetchPermissions();
  }

  /**
   * Get all users as an observable
   */
  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  /**
   * Fetch permissions from the backend
   */
  fetchPermissions(): void {
    const url = 'http://localhost:5083/api/Permissions';

    this.http.get<any[]>(url).subscribe({
      next: (permissionsData) => {
        const mapped = permissionsData.map(
          (permission) =>
            new Permission(
              permission.id,
              permission.permissionName,
              permission.isReadable,
              permission.isWritable,
              permission.isDeletable,
            ),
        );
        this.permissionsSubject.next(mapped); // 🔥 Emit the permissions
      },
      error: (error) => {
        console.error('Error fetching permissions:', error);
        // Initialize with empty array to prevent errors
        this.permissionsSubject.next([
          new Permission('1', 'SuperAdmin', true, true, true),
          new Permission('2', 'Admin', true, true, false),
          new Permission('3', 'Employee', true, false, false),
          new Permission('4', 'Lorem Ipsum', false, false, false),
        ]);
      },
    });
  }

  /**
   * Get default permissions for a role
   * @param roleId The role ID
   * @returns Array of permissions with default values for the role
   */
  getDefaultPermissionsForRole(roleId: string): Permission[] {
    // Get current permissions
    const currentPermissions = this.permissionsSubject.getValue();

    switch (roleId) {
      case '1':
        return currentPermissions.map(
          (p) => new Permission(p.id, p.name, true, true, true),
        );
      case '2':
        return currentPermissions.map(
          (p) => new Permission(p.id, p.name, true, true, false),
        );
      case '3':
        return currentPermissions.map(
          (p) => new Permission(p.id, p.name, true, false, false),
        );
      case '4':
        return currentPermissions.map(
          (p) => new Permission(p.id, p.name, false, false, false),
        );
      default:
        return currentPermissions;
    }
  }

  /**
   * Add a new user
   * @param userData The user data from the form
   * @returns The created user object
   */
  createUser(userData: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile?: string;
    role: Role;
    username: string;
    password: string;
    permissions: Permission[];
  }): Observable<User> {
    console.log('User creation payload:', userData);

    const createUserDto = {
      id: userData.userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.mobile || '',
      userName: userData.username,
      password: userData.password,
      roleId: userData.role?.id || '',
      permissionIds: userData.permissions
        .filter((p) => p.isReadable || p.isWritable || p.isDeletable)
        .map((p) => p.id),
    };

    console.log(
      'User permissions being sent to backend:',
      userData.permissions,
    );

    return this.http.post<any>(this.apiUrl, createUserDto).pipe(
      tap((responseData) => {
        console.log('Server response:', responseData);

        const newUser = new User(
          responseData.id,
          responseData.userName,
          responseData.firstName,
          responseData.lastName,
          responseData.email,
          new Date(responseData.createdAt || Date.now()),
          new Role(
            responseData.roleId,
            responseData.role?.name || userData.role.name,
          ),
          responseData.permissions?.map(
            (p: any) =>
              new Permission(
                p.id,
                p.name,
                p.isReadable || false,
                p.isWritable || false,
                p.isDeletable || false,
              ),
          ) || userData.permissions,
          responseData.phone || userData.mobile || '',
        );

        // Add to local cache
        this.users.push(newUser);
        this.usersSubject.next([...this.users]);

        return newUser;
      }),
      catchError((error) => {
        console.error('Error creating user:', error);
        return throwError(
          () => new Error('Failed to create user. Please try again.'),
        );
      }),
    );
  }

  /**
   * Update user permissions
   * @param userId The user ID
   * @param permissions The updated permissions
   * @returns Observable of the operation result
   */
  updateUserPermissions(
    userId: string,
    permissions: Permission[],
  ): Observable<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) return of(false);

    this.users[userIndex].permissions = permissions;
    this.usersSubject.next([...this.users]);

    // Log the updated permissions
    console.log(`Updated permissions for user ${userId}:`, permissions);

    return of(true);
  }

  /**
   * Delete a user
   * @param userId The user ID to delete
   * @returns Observable of the operation result
   */
  deleteUser(userId: string): Observable<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== userId);

    if (this.users.length !== initialLength) {
      this.usersSubject.next([...this.users]);
      console.log(`User ${userId} deleted`);
      return of(true);
    }

    return of(false);
  }

  /**
   * Check if username already exists
   * @param username The username to check
   * @returns Boolean indicating if username exists
   */
  isUsernameTaken(username: string): boolean {
    return this.users.some(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  /**
   * Check if email already exists
   * @param email The email to check
   * @returns Boolean indicating if email exists
   */
  isEmailTaken(email: string): boolean {
    return this.users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  /**
   * Generate a unique ID
   * @returns A unique string ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
