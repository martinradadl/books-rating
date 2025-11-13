import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/authors";
import type { AuthorI } from "../../data-structures";

export interface AuthorsState {
  authorsList: AuthorI[];
  selectedAuthor: AuthorI | null;
  status: string;
  error: string;
}

const initialState: AuthorsState = {
  authorsList: [],
  selectedAuthor: null,
  status: "idle",
  error: "",
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getAll.fulfilled, (state, action) => {
        state.status = "idle";
        state.authorsList = action.payload;
        state.error = "";
      })
      .addCase(actions.getAll.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch authors";
        state.authorsList = [];
      })
      .addCase(actions.getById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedAuthor = action.payload;
      })
      .addCase(actions.getById.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch author";
        state.selectedAuthor = null;
      })
      .addCase(actions.add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.add.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        authorsList: [...state.authorsList, action.payload],
      }))
      .addCase(actions.add.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to add author";
        state.selectedAuthor = null;
      });
  },
});

export default authorsSlice.reducer;
