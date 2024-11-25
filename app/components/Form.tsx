"use client";

import InputField from "./InputField";
import { useForm } from "react-hook-form";
import {
  questionSchema,
  QuestionSchema,
  studentSchema,
  StudentSchema,
} from "../lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useState } from "react";
import { registerQuestion, registerStudent } from "../lib/actions";
import { toast } from "react-toastify";
import RadioField from "./RadioField";
import Image from "next/image";
import logo from "../../public/logo.png";
import Confetti from "react-confetti-boom";
import Link from "next/link";

const steps = [
  { id: "Step 1", name: "Student Information" },
  { id: "Step 2", name: "Questions" },
  { id: "Step 3", name: "Complete" },
];

const answersA = [
  { label: "2006", value: "2006" },
  { label: "2008", value: "2008" },
  { label: "2010", value: "2010" },
  { label: "2012", value: "2012" },
];

const answersB = [
  { label: "Apple", value: "apple" },
  { label: "OpenAi", value: "openai" },
  { label: "Microsoft", value: "microsoft" },
  { label: "Google", value: "google" },
];

const MatrixForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [studentId, setStudentId] = useState<string>("");
  const [answerStatus, setanswerStatus] = useState<boolean>(false);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const {
    register: registerStudentInfo,
    handleSubmit: handleStudentSubmit,
    formState: { errors: studentErrors },
  } = useForm<StudentSchema>({ resolver: zodResolver(studentSchema) });

  const {
    register: registerQuestions,
    handleSubmit: handleQuestionSubmit,
    formState: { errors: questionErrors },
  } = useForm<QuestionSchema>({ resolver: zodResolver(questionSchema) });

  const [studentState, studentFormAction] = useActionState(registerStudent, {
    success: false,
    error: false,
  });

  const [questionState, questionFormAction] = useActionState(registerQuestion, {
    success: false,
    error: false,
    answerStatus: false,
  });

  const onStudentSubmit = handleStudentSubmit((data) => {
    studentFormAction(data);
  });

  const onQuestionSubmit = handleQuestionSubmit((data) => {
    questionFormAction(data);
  });

  useEffect(() => {
    console.log(answerStatus);

    if (studentState.success) {
      if (questionState.answerStatus) {
        toast.success(`Answers submitted!`);
        setanswerStatus(true);
        console.log("hi");
        next();
      // } else if (!questionState.answerStatus) {
      //   toast.warning(`Your answers were wrong`);
      //   next();
      } else {
        toast.success(`Answers are incorrect!`);
      }
    } else if (studentState.error) {
      if (studentState.studentId && studentState.error) {
        toast.error(`You have already filled the form!`);
      }
    }
  }, [studentState, questionState]);

  return (
    <div className="bg-white text-gray-900 shadow-lg rounded-lg w-[90%] md:w-[40%] p-8 mt-8">
      <div>
        <Image src={logo} height={140} width={140} alt="" />
      </div>
      <p>
        Register yourself & answer 2 simple questions to win a price at the
        GRAND DRAW ✨
      </p>
      <form onSubmit={currentStep === 0 ? onStudentSubmit : onQuestionSubmit}>
        {currentStep === 0 && (
          <>
            <div className="flex flex-col gap-4 py-4">
              <InputField
                label="Name"
                name="name"
                placeholder="Brian Gregory"
                register={registerStudentInfo}
                error={studentErrors.name}
              />

              <InputField
                label="Email Address"
                placeholder="ofiin@gmail.mx"
                name="email"
                type="email"
                register={registerStudentInfo}
                error={studentErrors.email}
              />

              <InputField
                label="Phone number"
                name="phoneNumber"
                placeholder="07xxxxxxxx"
                type="phone"
                register={registerStudentInfo}
                error={studentErrors.phoneNumber}
              />
            </div>
          </>
        )}
        {currentStep === 1 && (
          <>
            <div className="flex flex-col gap-4 py-4">
              <InputField
                label="studentId"
                name="studentId"
                defaultValue={studentId}
                hidden={true}
                register={registerQuestions}
                error={questionErrors.studentId}
              />

              <RadioField
                label="Matrix was estblished in ?"
                name="questionA"
                options={answersA}
                register={registerQuestions}
                error={questionErrors.questionA}
              />

              <RadioField
                label="Who inveted Chatgpt ?"
                name="questionB"
                options={answersB}
                register={registerQuestions}
                error={questionErrors.questionB}
              />
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className="bg-red-100 relative p-4 mb-4 pb-16 mt-8 rounded-lg">
              {answerStatus ? (
                <div>
                  <p>
                    Congratulations🎉, you have completed the form successfully!
                  </p>
                  <p>You will be contacted by Matrix in the near future</p>
                  <p>For more Information, please contact </p>
                  <button className="flex absolute right-1 bg-orange-400 p-2 rounded-md justify-end">
                    <Link
                      className="font-bold text-red-600"
                      href={"https://matrix-edu.com"}
                    >
                      Matrix IIT
                    </Link>
                  </button>
                  <Confetti mode="boom" particleCount={1000} shapeSize={20} />
                </div>
              ) : (
                <p>
                  You were not able to answer either one question correctly bad
                  luck!
                </p>
              )}
            </div>
          </>
        )}

        <div className="flex justify-end">
          {currentStep < 2 && (
            <button
              type="submit"
              disabled={currentStep === 2}
              className="bg-yellow-500 hover:bg-red-400 text-white text-md rounded-md py-1 px-2"
            >
              {currentStep === 1 ? "Next" : "submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MatrixForm;
