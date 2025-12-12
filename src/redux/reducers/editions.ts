import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/editions";
import type { EditionI } from "../../data-structures";

interface EditionsState {
  editionsList: EditionI[];
  selectedEdition: EditionI | null;
  moreEditionsFromBook: EditionI[];
  booksBySameAuthor: EditionI[];
  relatedBooks: EditionI[];
  status: string;
  error: string;
}

const initialState: EditionsState = {
  editionsList: [],
  selectedEdition: null,
  moreEditionsFromBook: [],
  booksBySameAuthor: [],
  relatedBooks: [],
  status: "idle",
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
        state.status = "loading";
      })
      .addCase(actions.getMoreEditionsFromBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.moreEditionsFromBook = action.payload;
      })
      .addCase(actions.getMoreEditionsFromBook.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch editions";
        state.moreEditionsFromBook = [];
      })
      .addCase(actions.getBooksBySameAuthor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getBooksBySameAuthor.fulfilled, (state, action) => {
        state.status = "idle";
        state.booksBySameAuthor = action.payload;
      })
      .addCase(actions.getBooksBySameAuthor.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch editions";
        state.booksBySameAuthor = [];
      })
      .addCase(actions.getRelatedBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getRelatedBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.relatedBooks = action.payload;
      })
      .addCase(actions.getRelatedBooks.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch editions";
        state.relatedBooks = [];
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
