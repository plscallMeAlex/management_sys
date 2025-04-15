import { Injectable } from '@angular/core';
import { Permission } from '../../models/permission_md';
import { Role } from '../../models/role_md';

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
  constructor() {}
}
