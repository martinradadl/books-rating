import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { GenreI } from "../../data-structures";

const getAll = createAsyncThunk("genres/getAll", async () => {
  try {
    const response = await axios.get(`${API_URL}/genres}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch genres");
  }
});

const getById = createAsyncThunk("genres/getById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/genres/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch genre");
  }
});

const add = createAsyncThunk<GenreI, GenreI>(
  "genres/add",
  async (newGenre: GenreI) => {
    try {
      const response = await axios.post(`${API_URL}/genres`, newGenre);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add genre");
    }
  }
);

const genresActions = {
  getAll,
  getById,
  add,
};

export default genresActions;
