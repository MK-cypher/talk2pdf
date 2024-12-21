import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (timestamp: string) => {
  const date = new Date(timestamp);

  // Using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  return formatter.format(date);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;

  // Find the appropriate unit level
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Convert to the unit and round to 2 decimal places
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));

  return `${size} ${units[i]}`;
};

export const monthDayYear = (date: Date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return monthNames[monthIndex] + " " + day + ", " + year;
};
