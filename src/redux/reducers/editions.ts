import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/editions";
import type { EditionI, EditionPreviewI } from "../../data-structures";

interface EditionsState {
  editionsList: EditionI[];
  selectedEdition: EditionI | null;
  moreEditionsFromBook: EditionI[];
  booksBySameAuthor: EditionI[];
  relatedBooks: EditionI[];
  latestReleases: EditionI[];
  mostRatedBooks: { list: EditionI[]; suggestion: EditionI | null };
  bestRatedBooks: { list: EditionI[]; suggestion: EditionI | null };
  searchResults: { results: EditionPreviewI[]; totalCount: number };
  autocompleteResults: EditionPreviewI[];
  autocompleteStatus: string;
  moreEditionsStatus: string;
  booksBySameAuthorStatus: string;
  relatedBooksStatus: string;
  status: string;
  error: string;
}

const initialState: EditionsState = {
  editionsList: [],
  selectedEdition: null,
  moreEditionsFromBook: [],
  booksBySameAuthor: [],
  relatedBooks: [],
  latestReleases: [],
  mostRatedBooks: { list: [], suggestion: null },
  bestRatedBooks: { list: [], suggestion: null },
  autocompleteResults: [],
  searchResults: { results: [], totalCount: 0 },
  status: "loading",
  moreEditionsStatus: "loading",
  booksBySameAuthorStatus: "loading",
  relatedBooksStatus: "loading",
  autocompleteStatus: "idle",
  error: "",
};

const editionsSlice = createSlice({
  name: "editions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getAll.fulfilled, (state, action) => {
        state.status = "idle";
        state.editionsList = action.payload;
      })
      .addCase(actions.getAll.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch editions";
        state.editionsList = [];
      })
      .addCase(actions.getById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedEdition = action.payload;
      })
      .addCase(actions.getById.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch edition";
        state.selectedEdition = null;
      })
      .addCase(actions.getMoreEditionsFromBook.pending, (state) => {
        state.moreEditionsStatus = "loading";
      })
      .addCase(actions.getMoreEditionsFromBook.fulfilled, (state, action) => {
        state.moreEditionsStatus = "idle";
        state.moreEditionsFromBook = action.payload;
      })
      .addCase(actions.getMoreEditionsFromBook.rejected, (state, action) => {
        state.moreEditionsStatus = "idle";
        state.error = action.error.message || "Failed to fetch editions";
        state.moreEditionsFromBook = [];
      })
      .addCase(actions.getBooksBySameAuthor.pending, (state) => {
        state.booksBySameAuthorStatus = "loading";
      })
      .addCase(actions.getBooksBySameAuthor.fulfilled, (state, action) => {
        state.booksBySameAuthorStatus = "idle";
        state.booksBySameAuthor = action.payload;
      })
      .addCase(actions.getBooksBySameAuthor.rejected, (state, action) => {
        state.booksBySameAuthorStatus = "idle";
        state.error = action.error.message || "Failed to fetch editions";
        state.booksBySameAuthor = [];
      })
      .addCase(actions.getRelatedBooks.pending, (state) => {
        state.relatedBooksStatus = "loading";
      })
      .addCase(actions.getRelatedBooks.fulfilled, (state, action) => {
        state.relatedBooksStatus = "idle";
        state.relatedBooks = action.payload;
      })
      .addCase(actions.getRelatedBooks.rejected, (state, action) => {
        state.relatedBooksStatus = "idle";
        state.error = action.error.message || "Failed to fetch editions";
        state.relatedBooks = [];
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
      })
      .addCase(actions.searchByTitleOrAuthor.pending, (state, action) => {
        if (!action.meta.arg.isAutocomplete) {
          state.status = "loading";
        } else {
          state.autocompleteStatus = "loading";
        }
      })
      .addCase(actions.searchByTitleOrAuthor.fulfilled, (state, action) => {
        if (action.payload.isAutocomplete) {
          state.autocompleteStatus = "idle";
          state.autocompleteResults = action.payload.data.results;
        } else {
          state.status = "idle";
          state.searchResults.results = action.payload.data.results;
          state.searchResults.totalCount = action.payload.data.totalCount;
        }
      })
      .addCase(actions.searchByTitleOrAuthor.rejected, (state, action) => {
        state.error = action.error.message || "Failed to search genres";

        if (action.meta.arg.isAutocomplete) {
          state.autocompleteStatus = "idle";
          state.autocompleteResults = [];
        } else {
          state.status = "idle";
          state.searchResults.results = [];
          state.searchResults.totalCount = 0;
        }
      })
      .addCase(actions.add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.add.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        editionsList: [...state.editionsList, action.payload],
      }))
      .addCase(actions.add.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to add edition";
        state.selectedEdition = null;
      })
      .addCase(actions.cleanUp, () => ({
        ...initialState,
      }));
  },
});

export default editionsSlice.reducer;
