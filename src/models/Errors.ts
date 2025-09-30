export interface AppError {
  name: "ValidationError" | "UnauthorizedError" | "NotFoundError" | "SystemError";
  message: string;
  code?: number;
  timestamp: string; 
}