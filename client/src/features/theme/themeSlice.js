import { createSlice } from "@reduxjs/toolkit";
import { readStorage } from "../../utils/storage";

const savedMode = readStorage(
  "movieExplorer:theme",
  "dark"
);

const themeSlice = createSlice({
  name: "theme",

  initialState: {
    mode: savedMode === "light" ? "light" : "dark",
  },

  reducers: {
    toggleTheme(state) {
      state.mode =
        state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;