import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { AuthorI } from "../../data-structures";

const getAll = createAsyncThunk("authors/getAll", async () => {
  try {
    const response = await axios.get(`${API_URL}/authors}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch authors");
  }
});

const getById = createAsyncThunk("authors/getById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/authors/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch author");
  }
});

const add = createAsyncThunk<AuthorI, AuthorI>(
  "authors/add",
  async (newAuthor: AuthorI) => {
    try {
      const response = await axios.post(`${API_URL}/authors`, newAuthor);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add author");
    }
  }
);

const authorsActions = {
  getAll,
  getById,
  add,
};

export default authorsActions;
