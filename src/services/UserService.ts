import type { User } from "../models/User";

export class UserService {
  private users: User[] = [];

  register(user: User) {
    this.users.push(user);
    return user;
  }

  getUserById(userId: string): User | undefined {
    return this.users.find((u) => u.userId === userId);
  }

  getAll(): User[] {
    return this.users;
  }
}