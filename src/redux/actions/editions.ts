import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { EditionI } from "../../data-structures";

const getAll = createAsyncThunk("editions/getAll", async () => {
  try {
    const response = await axios.get(`${API_URL}/editions}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch editions");
  }
});

const getById = createAsyncThunk("editions/getById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/editions/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch edition");
  }
});

const add = createAsyncThunk<EditionI, EditionI>(
  "editions/add",
  async (newEdition: EditionI) => {
    try {
      const response = await axios.post(`${API_URL}/editions`, newEdition);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add edition");
    }
  }
);

const editionsActions = {
  getAll,
  getById,
  add,
};

export default editionsActions;
