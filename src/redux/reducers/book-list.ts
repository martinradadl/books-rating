import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/book-lists";
import type { BookListI, EditionI } from "../../data-structures";

interface BookListsState {
  listOfBookLists: BookListI[];
  selectedBookList: BookListI | null;
  latestReleases: EditionI[];
  mostRatedBooks: { list: EditionI[]; suggestion: EditionI | null };
  bestRatedBooks: { list: EditionI[]; suggestion: EditionI | null };
  status: string;
  error: string;
}

const initialState: BookListsState = {
  listOfBookLists: [],
  selectedBookList: null,
  latestReleases: [],
  mostRatedBooks: { list: [], suggestion: null },
  bestRatedBooks: { list: [], suggestion: null },
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

        const updatedSelectedBooklist = action?.payload?.isMobile
          ? {
              ...action.payload.data,
              books: [
                ...(action.payload.isFirstPage
                  ? []
                  : state.selectedBookList?.books || []),
                ...action.payload.data.books,
              ],
            }
          : action?.payload?.data;

        state.selectedBookList = updatedSelectedBooklist;
      })
      .addCase(actions.getByTitle.rejected, (state, action) => {
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
      })
      .addCase(actions.getMostRatedBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getMostRatedBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.mostRatedBooks = action.payload;
      })
      .addCase(actions.getMostRatedBooks.rejected, (state, action) => {
        state.status = "idle";
        state.error =
          action.error.message || "Failed to fetch most rated books";
        state.mostRatedBooks = { list: [], suggestion: null };
      })
      .addCase(actions.getBestRatedBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getBestRatedBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.bestRatedBooks = action.payload;
      })
      .addCase(actions.getBestRatedBooks.rejected, (state, action) => {
        state.status = "idle";
        state.error =
          action.error.message || "Failed to fetch best rated books";
        state.bestRatedBooks = { list: [], suggestion: null };
      });
  },
});

export default bookListsSlice.reducer;
