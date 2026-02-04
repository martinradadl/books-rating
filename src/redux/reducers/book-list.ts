import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/book-lists";
import type { BookListI, EditionI } from "../../data-structures";

interface BookListsState {
  listOfBookLists: BookListI[];
  selectedBookList: BookListI | null;
  latestReleases: EditionI[];
  status: string;
  error: string;
}

const initialState: BookListsState = {
  listOfBookLists: [],
  selectedBookList: null,
  latestReleases: [],
  status: "idle",
  error: "",
};

const bookListsSlice = createSlice({
  name: "bookLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getAll.fulfilled, (state, action) => {
        state.status = "idle";
        state.listOfBookLists = action.payload;
      })
      .addCase(actions.getAll.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch book lists";
        state.listOfBookLists = [];
      })
      .addCase(actions.getById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedBookList = action.payload;
      })
      .addCase(actions.getById.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch book list";
        state.selectedBookList = null;
      })
      .addCase(actions.getLatestReleases.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getLatestReleases.fulfilled, (state, action) => {
        state.status = "idle";
        state.latestReleases = action.payload;
      })
      .addCase(actions.getLatestReleases.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch latest releases";
        state.latestReleases = [];
      });
  },
});

export default bookListsSlice.reducer;
