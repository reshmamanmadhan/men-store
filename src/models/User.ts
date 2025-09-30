export type Role = "customer" | "admin";


export interface User {
userId: string;
name: string;
email: string;
role: Role;
createdAt: string;
}