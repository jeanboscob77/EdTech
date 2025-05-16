import { ReactNode } from "react";

export type Course = {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  prerequisites?: string;
  instructor: string;
  isEnrolled: boolean;
  error: string;
};

export interface EnrollButtonProps {
  courseId: string;
}

export interface ExtendedEnrollButtonProps extends EnrollButtonProps {
  isEnrolled: boolean;
  buttonText?: string;
}

export type Props = {
  initialCourses: Course[];
};

export interface ReduxProviderProps {
  children: ReactNode;
}
