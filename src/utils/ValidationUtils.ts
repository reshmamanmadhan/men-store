export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateString(value: any, fieldName: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new ValidationError(`${fieldName} must be a non-empty string`);
  }
}

export function validateNumber(value: any, fieldName: string) {
  if (typeof value !== "number" || isNaN(value) || value < 0) {
    throw new ValidationError(`${fieldName} must be a positive number`);
  }
}

export function validateArray<T>(arr: any, fieldName: string): T[] {
  if (!Array.isArray(arr)) {
    throw new ValidationError(`${fieldName} must be an array`);
  }
  return arr as T[];
}
