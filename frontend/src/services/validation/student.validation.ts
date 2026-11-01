import * as yup from "yup";

// Client-side validation for the Add/Edit Student form.
export const studentValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .integer("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be 120 or less")
    .required("Age is required"),
  course: yup.string().trim().required("Course is required"),
});

export type StudentValidationValues = yup.InferType<
  typeof studentValidationSchema
>;
