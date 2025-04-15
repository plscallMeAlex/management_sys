import { inject, Injectable } from '@angular/core';
import { User } from '../models/user_md';
import { Permission } from '../models/permission_md';
import { Role } from '../models/role_md';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  private displayedUsersSubject = new BehaviorSubject<User[]>([]);
  public displayedUsers$ = this.displayedUsersSubject.asObservable();
  users: Array<User> = [];

  private _currentPage: number = 1;
  private _itemsPerPage: number = 6;
  private _startUser: number = 0;
  private _endUser: number = this._itemsPerPage;

  constructor() {
    this.usersSubject.next(this.users);
    this.updateDisplayedUsers();
  }

  // Getters for pagination values
  get currentPage(): number {
    return this._currentPage;
  }

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  get startUser(): number {
    return this._startUser;
  }

  get endUser(): number {
    return Math.min(this._endUser, this.users.length);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this._itemsPerPage);
  }

  fetchUsers(): void {
    const url = 'http://localhost:5083/api/Users';
    this.http.get<any[]>(url).subscribe({
      next: (usersData) => {
        try {
          // Map API data to your User model structure
          const mappedUsers = usersData.map((userData) => {
            return new User(
              userData.id,
              userData.userName,
              userData.firstName,
              userData.lastName,
              userData.email,
              userData.createdAt ? new Date(userData.createdAt) : new Date(),
              new Role(userData.roleId || '', userData.roleName || 'User'),
              userData.permissions?.map(
                (p: Permission) =>
                  new Permission(
                    p.id,
                    p.name,
                    p.isReadable,
                    p.isWritable,
                    p.isDeletable,
                  ),
              ) || [],
              userData.phone,
            );
          });

          this.users = mappedUsers;
          this.usersSubject.next(this.users);
          this._currentPage = 1; // Reset to first page when fetching new data
          this.updatePaginationIndices();
          this.updateDisplayedUsers();
        } catch (e) {
          console.error('Error mapping user data:', e);
          // Fallback to mock data if mapping fails
          this.usersSubject.next(this.users);
          this.updateDisplayedUsers();
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        // Fallback to mock data on error
        this.usersSubject.next(this.users);
        this.updateDisplayedUsers();
      },
    });
  }

  // Method to update a user
  updateUser(user: User): void {
    const url = `http://localhost:5083/api/Users/${user.id}`;
    this.http.put<User>(url, user).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.usersSubject.next([...this.users]);
          this.updateDisplayedUsers();
        }
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }

  // Method to delete a user
  deleteUser(userId: string): void {
    const url = `http://localhost:5083/api/Users/${userId}`;
    this.http.delete(url).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.usersSubject.next([...this.users]);

        if (
          this.displayedUsersSubject.value.length === 0 &&
          this._currentPage > 1
        ) {
          this._currentPage--;
        }

        this.updatePaginationIndices();
        this.updateDisplayedUsers();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }

  // Method to update displayed users based on pagination
  private updateDisplayedUsers(): void {
    const displayedUsers = this.users.slice(this._startUser, this._endUser);
    this.displayedUsersSubject.next(displayedUsers);
  }

  // Method to set items per page
  setItemsPerPage(count: number): void {
    this._itemsPerPage = count;
    this._currentPage = 1; // Reset to first page when changing items per page
    this.updatePaginationIndices();
    this.updateDisplayedUsers();
  }

  // Helper method to update startUser and endUser indices
  private updatePaginationIndices(): void {
    this._startUser = (this._currentPage - 1) * this._itemsPerPage;
    this._endUser = this._startUser + this._itemsPerPage;
  }

  // Method to go to next page
  nextPage(): void {
    if (this.canGoForward()) {
      this._currentPage++;
      this.updatePaginationIndices();
      this.updateDisplayedUsers();
    }
  }

  // Method to go to previous page
  prevPage(): void {
    if (this.canGoBackward()) {
      this._currentPage--;
      this.updatePaginationIndices();
      this.updateDisplayedUsers();
    }
  }

  // Method to check if can go forward
  canGoForward(): boolean {
    return this._currentPage < this.totalPages;
  }

  // Method to check if can go backward
  canGoBackward(): boolean {
    return this._currentPage > 1;
  }

  // Method to go to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this._currentPage = page;
      this.updatePaginationIndices();
      this.updateDisplayedUsers();
    }
  }

  // Method to get users for current page
  getCurrentPageUsers(): User[] {
    return this.users.slice(this._startUser, this._endUser);
  }
}
