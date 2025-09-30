import type { AppError } from "../models/Errors";


export const mockErrors: AppError[] = [
  {
    name: "ValidationError",
    message: "Email format is invalid",
    code: 400,
    timestamp: new Date("2025-01-10T09:30:00Z").toISOString(),
  },
  {
    name: "UnauthorizedError",
    message: "User does not have permission to access this resource",
    code: 403,
    timestamp: new Date("2025-01-15T12:00:00Z").toISOString(),
  },
  {
    name: "NotFoundError",
    message: "Requested product was not found",
    code: 404,
    timestamp: new Date("2025-01-20T18:45:00Z").toISOString(),
  },
  {
    name: "SystemError",
    message: "Unexpected server failure",
    code: 500,
    timestamp: new Date("2025-01-25T22:10:00Z").toISOString(),
  },
];
