import { Injectable } from '@angular/core';
import { Permission } from '../../models/permission_md';
import { Role } from '../../models/role_md';
import { BehaviorSubject, Observable } from 'rxjs';

// User interface to define the structure of user data
export interface User {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  role: Role;
  username: string;
  password?: string; // Optional in returned data for security
  permissions: Permission[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AdduserModalService {
  permissions: Array<Permission> = [
    new Permission('1', 'SuperAdmin', true, true, true),
    new Permission('2', 'Admin', true, false, false),
    new Permission('3', 'Employee', true, false, false),
    new Permission('4', 'Lorem Ipsum', true, true, true),
  ];

  roles: Array<Role> = [
    new Role('1', 'Super Admin'),
    new Role('2', 'Admin'),
    new Role('3', 'Employee'),
    new Role('4', 'User'),
  ];

  // Store users in memory for demo purposes
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor() {}

  /**
   * Get all users as an observable
   */
  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
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
  }): User {
    // Create a new user object
    const newUser: User = {
      id: this.generateId(),
      ...userData,
      createdAt: new Date(),
    };

    // Log the payload (as requested)
    console.log('User creation payload:', userData);

    // In a real app, you would make an API call here
    // For now, we'll just store it in memory
    this.users.push(newUser);
    this.usersSubject.next([...this.users]);

    return newUser;
  }

  /**
   * Update user permissions
   * @param userId The user ID
   * @param permissions The updated permissions
   * @returns Boolean indicating success
   */
  updateUserPermissions(userId: string, permissions: Permission[]): boolean {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) return false;

    this.users[userIndex].permissions = permissions;
    this.usersSubject.next([...this.users]);

    // Log the updated permissions
    console.log(`Updated permissions for user ${userId}:`, permissions);

    return true;
  }

  /**
   * Delete a user
   * @param userId The user ID to delete
   * @returns Boolean indicating success
   */
  deleteUser(userId: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== userId);

    if (this.users.length !== initialLength) {
      this.usersSubject.next([...this.users]);
      console.log(`User ${userId} deleted`);
      return true;
    }

    return false;
  }

  /**
   * Get default permissions based on role
   * @param roleId The role ID
   * @returns Permissions array with default values
   */
  getDefaultPermissionsForRole(roleId: string): Permission[] {
    // Map role IDs to default permissions
    const permissionMap: {
      [key: string]: { read: boolean; write: boolean; delete: boolean };
    } = {
      '1': { read: true, write: true, delete: true }, // Super Admin
      '2': { read: true, write: true, delete: false }, // Admin
      '3': { read: true, write: false, delete: false }, // Employee
      '4': { read: true, write: false, delete: false }, // User
    };

    const defaults = permissionMap[roleId] || {
      read: false,
      write: false,
      delete: false,
    };

    // Clone permissions and set default values based on role
    return this.permissions.map(
      (p) =>
        new Permission(
          p.id,
          p.name,
          defaults.read,
          defaults.write,
          defaults.delete,
        ),
    );
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
