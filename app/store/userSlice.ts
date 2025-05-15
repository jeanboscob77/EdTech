import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  role: string
  // add more fields if your token includes them
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | any;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string | { token: string }>) {
      const actualToken = typeof action.payload === 'string'
        ? action.payload
        : action.payload.token;

      state.token = actualToken;
      state.isAuthenticated = true;

      try {
        const decoded: any = jwtDecode(actualToken);

        state.user = {
          id: decoded.id,
          name: decoded.name,
          role: decoded.role
          // include other fields from your token if needed
        };
      } catch (error) {
        console.error("Invalid token:", error);
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      }
    },

    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
