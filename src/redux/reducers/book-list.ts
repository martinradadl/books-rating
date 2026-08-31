import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/book-lists";
import type { BookListI } from "../../data-structures";

interface BookListsState {
  listOfBookLists: BookListI[];
  bookListsByGenre: BookListI[];
  selectedBookList: BookListI | null;
  bookListsCount: number;
  status: string;
  error: string;
}

const initialState: BookListsState = {
  listOfBookLists: [],
  bookListsByGenre: [],
  selectedBookList: null,
  bookListsCount: 0,
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
      .addCase(actions.getByRelatedGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getByRelatedGenre.fulfilled, (state, action) => {
        state.status = "idle";

        const updatedBooksMobile = [
          ...(action.payload.isFirstPage ? [] : state.listOfBookLists || []),
          ...action.payload.bookLists,
        ];

        const updatedListOfBookLists = action?.payload?.isMobile
          ? updatedBooksMobile
          : action?.payload?.bookLists;

        state.bookListsByGenre = updatedListOfBookLists;
        state.bookListsCount = action.payload.bookListsCount;
      })
      .addCase(actions.getByRelatedGenre.rejected, (state, action) => {
        state.status = "idle";
        state.error =
          action.error.message || "Failed to fetch list of book lists";
        state.bookListsByGenre = [];
        state.bookListsCount = 0;
      })
      .addCase(actions.resetStatusToLoading, (state) => {
        state.status = "loading";
      })
      .addCase(actions.resetListOfBookLists, (state) => {
        state.listOfBookLists = [];
      });
  },
});

export default bookListsSlice.reducer;
