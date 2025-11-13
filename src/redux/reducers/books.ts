import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/books";
import type { BookI } from "../../data-structures";

interface BooksState {
  booksList: BookI[];
  selectedBook: BookI | null;
  status: string;
  error: string;
}

const initialState: BooksState = {
  booksList: [],
  selectedBook: null,
  status: "idle",
  error: "",
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getAll.fulfilled, (state, action) => {
        state.status = "idle";
        state.booksList = action.payload;
      })
      .addCase(actions.getAll.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch books";
        state.booksList = [];
      })
      .addCase(actions.getById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedBook = action.payload;
      })
      .addCase(actions.getById.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch book";
        state.selectedBook = null;
      })
      .addCase(actions.add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.add.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        booksList: [...state.booksList, action.payload],
      }))
      .addCase(actions.add.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to add book";
        state.selectedBook = null;
      });
  },
});

export default booksSlice.reducer;
