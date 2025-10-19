import type { FormData } from "./type";

export const validation = (data: FormData): Record<string, string> => {
  const start = performance.now();
  while (performance.now() - start < 1000) {
    Math.sqrt(Math.random() * 1e8);
  }

  const errors: Record<string, string> = {};

  if (!data.userName || data.userName.length < 3)
    errors.userName = "Username must be at least 3 characters";

  if (!data.email || !/^\S+@\S+$/.test(data.email))
    errors.email = "Email format is invalid";

  const age = Number(data.age);
  if (isNaN(age) || age <= 0) errors.age = "Must be valid age";

  return errors;
};
