import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { SettingI } from "../../data-structures";

const getAll = createAsyncThunk("settings/getAll", async () => {
  try {
    const response = await axios.get(`${API_URL}/settings}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch settings");
  }
});

const getById = createAsyncThunk("settings/getById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/settings/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch setting");
  }
});

const add = createAsyncThunk<SettingI, SettingI>(
  "settings/add",
  async (newSetting: SettingI) => {
    try {
      const response = await axios.post(`${API_URL}/settings`, newSetting);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add setting");
    }
  }
);

const settingsActions = {
  getAll,
  getById,
  add,
};

export default settingsActions;
