import type { FieldError, UseFormRegister } from "react-hook-form";
import { z } from "zod";

// Define the structure of a Pokemon object
export type Pokemon = {
  name: string;
  image: string;
  types: string[];
};

// Define the form data structure
export type FormData = {
  title: string;
  email: string;
  description: string;
};

// Define valid field names as a union type
export type ValidFieldNames = keyof FormData;

// Define the props for a form field component
export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error?: FieldError;
};

export const UserSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  description: z.string().min(1, { message: "Description is required" }),
});