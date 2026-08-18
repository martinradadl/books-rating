import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/book-lists";
import type { BookListI } from "../../data-structures";

interface BookListsState {
  listOfBookLists: BookListI[];
  selectedBookList: BookListI | null;
  status: string;
  error: string;
}

const initialState: BookListsState = {
  listOfBookLists: [],
  selectedBookList: null,
  status: "loading",
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
      .addCase(actions.getByTitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getByTitle.fulfilled, (state, action) => {
        state.status = "idle";

        const updatedBooksMobile = [
          ...(action.payload.isFirstPage
            ? []
            : state.selectedBookList?.books || []),
          ...action.payload.data.books,
        ];

        const updatedSelectedBooklist = action?.payload?.isMobile
          ? {
              ...action.payload.data,
              books: updatedBooksMobile,
            }
          : action?.payload?.data;

        state.selectedBookList = updatedSelectedBooklist;
      })
      .addCase(actions.getByTitle.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch book list";
        state.selectedBookList = null;
      })
      .addCase(actions.resetStatusToLoading, (state) => {
        state.status = "loading";
      });
  },
});

export default bookListsSlice.reducer;
