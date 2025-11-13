import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/characters";
import type { CharacterI } from "../../data-structures";

interface CharactersState {
  charactersList: CharacterI[];
  selectedCharacter: CharacterI | null;
  status: string;
  error: string;
}

const initialState: CharactersState = {
  charactersList: [],
  selectedCharacter: null,
  status: "idle",
  error: "",
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getAll.fulfilled, (state, action) => {
        state.status = "idle";
        state.charactersList = action.payload;
      })
      .addCase(actions.getAll.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch characters";
        state.charactersList = [];
      })
      .addCase(actions.getById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedCharacter = action.payload;
      })
      .addCase(actions.getById.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch character";
        state.selectedCharacter = null;
      })
      .addCase(actions.add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.add.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        charactersList: [...state.charactersList, action.payload],
      }))
      .addCase(actions.add.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to add character";
        state.selectedCharacter = null;
      });
  },
});

export default charactersSlice.reducer;
