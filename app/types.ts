import type { FieldError, UseFormRegister } from "react-hook-form";
import { type ZodType, z } from "zod";

export type Pokemon = {
  name: string;
  image: string;
  types: string[];
};

export type FormData = {
  title: string;
  email: string;
  description: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
};

export type ValidFieldNames =
  | "title"
  | "email"
  | "description";


 export const UserSchema: ZodType<FormData> = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    description: z.string().min(1, { message: "Description is required" }),
  });
