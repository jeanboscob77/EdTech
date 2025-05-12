import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoursesState {
  enrolledCourseIds: string[];
  message: string;  // Add message property to store the confirmation message
}

const initialState: CoursesState = {
  enrolledCourseIds: [],
  message: "",  // Initialize the message as an empty string
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<string>) => {
      if (!state.enrolledCourseIds.includes(action.payload)) {
        state.enrolledCourseIds.push(action.payload);
        state.message = "The course has been successfully enrolled.";  // Set the message when enrolling
      }
    },
    clearMessage: (state) => {
      state.message = "";  // Clear the message when needed
    },
  },
});

export const { enroll, clearMessage } = coursesSlice.actions;
export default coursesSlice.reducer;
