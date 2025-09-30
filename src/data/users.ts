import type { User } from "../models/User";

export const mockUsers: User[] = [
  {
    userId: "u1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    createdAt: new Date("2024-01-10T09:30:00Z").toISOString(),
  },
  {
    userId: "u2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "customer",
    createdAt: new Date("2024-02-15T14:12:00Z").toISOString(),
  },
  {
    userId: "u3",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "customer",
    createdAt: new Date("2024-03-02T17:45:00Z").toISOString(),
  },
  {
    userId: "u4",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "customer",
    createdAt: new Date("2024-04-22T11:00:00Z").toISOString(),
  },
];
