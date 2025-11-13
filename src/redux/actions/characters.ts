import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { CharacterI } from "../../data-structures";

const getAll = createAsyncThunk("characters/getAll", async () => {
  try {
    const response = await axios.get(`${API_URL}/characters}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch characters");
  }
});

const getById = createAsyncThunk("characters/getById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/characters/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch character");
  }
});

const add = createAsyncThunk<CharacterI, CharacterI>(
  "characters/add",
  async (newCharacter: CharacterI) => {
    try {
      const response = await axios.post(`${API_URL}/characters`, newCharacter);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add character");
    }
  }
);

const charactersActions = {
  getAll,
  getById,
  add,
};

export default charactersActions;
