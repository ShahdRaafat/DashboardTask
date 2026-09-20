import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
  name: string;
  email: string;
};

type AuthState = {
  user: AuthUser | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.error || "Login failed");
    }

    return data.user as AuthUser;
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.error);
    }

    return data.user as AuthUser;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
