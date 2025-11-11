import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/editions";
import type { EditionI } from "../../data-structures";

interface EditionsState {
  editionsList: EditionI[];
  selectedEdition: EditionI | null;
  status: string;
  error: string;
}

const initialState: EditionsState = {
  editionsList: [],
  selectedEdition: null,
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
      });
  },
});

export default editionsSlice.reducer;
