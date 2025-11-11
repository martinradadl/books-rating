import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/settings";
import type { SettingI } from "../../data-structures";

interface SettingsState {
  settingsList: SettingI[];
  selectedSetting: SettingI | null;
  status: string;
  error: string;
}

const initialState: SettingsState = {
  settingsList: [],
  selectedSetting: null,
  status: "idle",
  error: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getAll.fulfilled, (state, action) => {
        state.status = "idle";
        state.settingsList = action.payload;
      })
      .addCase(actions.getAll.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch settings";
        state.settingsList = [];
      })
      .addCase(actions.getById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.getById.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedSetting = action.payload;
      })
      .addCase(actions.getById.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch setting";
        state.selectedSetting = null;
      })
      .addCase(actions.add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.add.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        settingsList: [...state.settingsList, action.payload],
      }))
      .addCase(actions.add.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to add setting";
        state.selectedSetting = null;
      });
  },
});

export default settingsSlice.reducer;
