import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { authApi } from "../../api/authApi";
import { apiError } from "../../api/axiosClient";

export const restoreSession = createAsyncThunk(
  "auth/restore",
  async (_, { signal }) => {
    try {
      const response = await authApi.me(signal);
      return response.data.data;
    } catch {
      return null;
    }
  }
);

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (
    { mode, credentials },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi[mode](credentials);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    initialized: false,
    loading: false,
    error: null,
  },

  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        restoreSession.fulfilled,
        (state, action) => {
          state.user = action.payload;
          state.initialized = true;
          state.error = null;
        }
      )

      .addCase(
        restoreSession.rejected,
        (state) => {
          state.user = null;
          state.initialized = true;
          state.error = null;
        }
      )

      .addCase(authenticate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        authenticate.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.initialized = true;
        }
      )

      .addCase(
        authenticate.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Unable to sign in.";
        }
      )

      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })

      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Unable to sign out.";
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;