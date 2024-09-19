import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleIdInArray(arr: string[], id: string): string[] {
  const index = arr.indexOf(id);
  if (index !== -1) {
    // ID exists in the array, so remove it
    arr.splice(index, 1);
  } else {
    // ID does not exist in the array, so add it
    arr.push(id);
  }
  return arr;
}

export function toggleId(id: string, prevId: string): string {
  return id === prevId ? "" : id;
}

export function idExistInArray(arr: string[], id: string): boolean {
  return arr.indexOf(id) !== -1;
}

export function getAllIdsInArray(arr: any[], id: string): string[] {
  return arr.map((item: any) => item[id]);
}