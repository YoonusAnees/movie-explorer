import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { authApi } from "../../api/authApi";
import { apiError } from "../../api/axiosClient";
import {
  readStorage,
  writeStorage,
  removeStorage,
  AUTH_USER_KEY,
} from "../../utils/storage";

export const restoreSession = createAsyncThunk(
  "auth/restore",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.me();
      return response.data.data;
    } catch (error) {
      const status = error.response?.status;
      return rejectWithValue({
        status,
        message: apiError(error),
      });
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

const cachedUser = readStorage(AUTH_USER_KEY, null);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: cachedUser,
    initialized: !!cachedUser,
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
          if (action.payload) {
            writeStorage(AUTH_USER_KEY, action.payload);
          } else {
            removeStorage(AUTH_USER_KEY);
          }
        }
      )

      .addCase(
        restoreSession.rejected,
        (state, action) => {
          state.initialized = true;
          if (action.payload?.status === 401) {
            state.user = null;
            removeStorage(AUTH_USER_KEY);
          }
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
          if (action.payload) {
            writeStorage(AUTH_USER_KEY, action.payload);
          }
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
        removeStorage(AUTH_USER_KEY);
      })

      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        removeStorage(AUTH_USER_KEY);
        state.error =
          action.payload || "Unable to sign out.";
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;