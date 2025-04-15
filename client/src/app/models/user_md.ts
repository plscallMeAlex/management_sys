import { Permission } from './permission_md';
import { Role } from './role_md';

export class User {
  constructor(
    public id: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public createdAt: Date,
    public role: Role,
    public permissions: Permission[],
    public phone?: string,
  ) {}
}
