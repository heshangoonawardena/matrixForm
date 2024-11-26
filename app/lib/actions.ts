"use server";

import { QuestionSchema, StudentSchema } from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = {
  success: boolean;
  error: boolean;
  studentId?: string;
  answerStatus?: boolean;
};

export const registerStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [{ email: data.email }, { mobile_number: data.phoneNumber }],
      },
    });

    if (existingStudent) {
      return { success: false, error: true, studentId: existingStudent.id };
    }

    const student = await prisma.student.create({
      data: {
        name: data.name,
        mobile_number: data.phoneNumber,
        email: data.email,
      },
    });
    return { success: true, error: false, studentId: student.id };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const registerQuestion = async (
  currentState: CurrentState,
  data: QuestionSchema
) => {
  try {
    if (data.questionA === "2006" && data.questionB === "openai") {
      const result = await prisma.student.update({
        where: {
          id: data.studentId,
        },
        data: {
          answer_correct: true,
        },
      });
      return {
        success: true,
        error: false,
        answerStatus: result.answer_correct,
      };
    } else {
      return { success: true, error: false, answerStatus: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
