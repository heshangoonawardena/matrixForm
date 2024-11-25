import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(3, { message: "Name is required!" }).max(50),
  email: z.string({ message: "Email is required!" }).email(),
  phoneNumber: z
    .string()
    .min(10, { message: "Invalid phone number!" })
    .max(15, { message: "Invalid phone number!" })
    .trim()
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const questionSchema = z.object({
  studentId: z.string().optional(),
  questionA: z.string({ message: "Cannot leave blank!" }).trim(),
  questionB: z.string({ message: "Cannot leave blank!" }).trim(),
});

export type QuestionSchema = z.infer<typeof questionSchema>;
