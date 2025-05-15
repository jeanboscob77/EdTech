import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoursesState {
  enrolledCourseIds: string[];
  message: string;
}

const initialState: CoursesState = {
  enrolledCourseIds: [],
  message: "",
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<string>) => {
      if (!state.enrolledCourseIds.includes(action.payload)) {
        state.enrolledCourseIds.push(action.payload);
        state.message = "The course has been successfully enrolled.";
      }
    },
    unenroll: (state, action: PayloadAction<string>) => {
      state.enrolledCourseIds = state.enrolledCourseIds.filter(id => id !== action.payload);
      state.message = "You have been successfully unenrolled from the course.";
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
});

export const { enroll, unenroll, clearMessage } = coursesSlice.actions;
export default coursesSlice.reducer;
