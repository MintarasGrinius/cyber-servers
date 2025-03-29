import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isObjectWithMessage = (
  object: unknown
): object is { message: string } => {
  return (
    typeof object === "object" &&
    object !== null &&
    "message" in object &&
    typeof (object as { message: unknown }).message === "string"
  );
};
