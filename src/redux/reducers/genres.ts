import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/genres";
import type { EditionI, GenreI } from "../../data-structures";

interface GenresState {
  genresList: GenreI[];
  browseGenresList: GenreI[];
  selectedGenre: GenreI | null;
  relatedGenres: GenreI[];
  discoverList: { genre: GenreI; editions: EditionI[] }[];
  autocompleteResults: GenreI[];
  searchResults: { results: GenreI[]; totalCount: number };
  status: string;
  browseGenresListStatus: string;
  autocompleteStatus: string;
  browseGenresListRequested: boolean;
  error: string;
}

const initialState: GenresState = {
  genresList: [],
  browseGenresList: [],
  selectedGenre: null,
  relatedGenres: [],
  discoverList: [],
  autocompleteResults: [],
  searchResults: { results: [], totalCount: 0 },
  status: "idle",
  browseGenresListStatus: "idle",
  autocompleteStatus: "idle",
  browseGenresListRequested: false,
  error: "",
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getAll.pending, (state, action) => {
        if (action.meta.arg.isBrowseGenresList) {
          state.browseGenresListStatus = "loading";
        } else {
          state.status = "loading";
        }
      })
      .addCase(actions.getAll.fulfilled, (state, action) => {
        if (!action.payload.isBrowseGenresList) {
          state.status = "idle";
          state.genresList = action.payload.data;
        } else if (state.browseGenresListRequested === false) {
          state.browseGenresListStatus = "idle";
          state.browseGenresList = action.payload.data;
          state.browseGenresListRequested = true;
        }
        state.browseGenresListStatus = "idle";
      })
      .addCase(actions.getAll.rejected, (state, action) => {
        if (action.meta.arg.isBrowseGenresList) {
          state.browseGenresListStatus = "idle";
          state.browseGenresList = [];
        } else {
          state.status = "idle";
          state.genresList = [];
        }

        state.error = action.error.message || "Failed to fetch genres";
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
      .addCase(actions.searchByName.pending, (state, action) => {
        if (!action.meta.arg.isAutocomplete) {
          state.status = "loading";
        } else {
          state.autocompleteStatus = "loading";
        }
      })
      .addCase(actions.searchByName.fulfilled, (state, action) => {
        if (action.payload.isAutocomplete) {
          state.autocompleteStatus = "idle";
          state.autocompleteResults = action.payload.data.results;
        } else {
          state.status = "idle";
          state.searchResults.results = action.payload.data.results;
          state.searchResults.totalCount = action.payload.data.totalCount;
        }
      })
      .addCase(actions.searchByName.rejected, (state, action) => {
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
