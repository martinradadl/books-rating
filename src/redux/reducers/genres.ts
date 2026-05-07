import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/genres";
import type { EditionI, GenreI } from "../../data-structures";

interface GenresState {
  genresList: GenreI[];
  selectedGenre: GenreI | null;
  relatedGenres: GenreI[];
  discoverList: { genre: GenreI; editions: EditionI[] }[];
  status: string;
  error: string;
}

const initialState: GenresState = {
  genresList: [],
  selectedGenre: null,
  relatedGenres: [],
  discoverList: [],
  status: "idle",
  error: "",
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getAll.fulfilled, (state, action) => {
        state.status = "idle";
        state.genresList = action.payload;
      })
      .addCase(actions.getAll.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch genres";
        state.genresList = [];
      })
      .addCase(actions.getById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedGenre = action.payload;
      })
      .addCase(actions.getById.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch genre";
        state.selectedGenre = null;
      })
      .addCase(actions.getByUrlSlug.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getByUrlSlug.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedGenre = action.payload;
      })
      .addCase(actions.getByUrlSlug.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch genre";
        state.selectedGenre = null;
      })
      .addCase(actions.getRelatedGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getRelatedGenres.fulfilled, (state, action) => {
        state.status = "idle";
        state.relatedGenres = action.payload;
      })
      .addCase(actions.getRelatedGenres.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch genres";
        state.relatedGenres = [];
      })
      .addCase(actions.getDiscoverList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getDiscoverList.fulfilled, (state, action) => {
        state.status = "idle";
        state.discoverList = action.payload;
      })
      .addCase(actions.getDiscoverList.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch list";
        state.discoverList = [];
      })
      .addCase(actions.add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.add.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        genresList: [...state.genresList, action.payload],
      }))
      .addCase(actions.add.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to add genre";
        state.selectedGenre = null;
      });
  },
});

export default genresSlice.reducer;
