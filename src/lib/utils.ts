import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function idMaker(category: string, doctorId: string) {
  return `(\'${category}\', \'${doctorId}\')`;
}

export function idParser(id: string) {
  const match = id.match(/^\('([^']+)', '([^']+)'\)$/);
  if (match) {
    return { category: match[1], doctorId: match[2] };
  }
  throw new Error(`Invalid ID format: ${id}`);
}