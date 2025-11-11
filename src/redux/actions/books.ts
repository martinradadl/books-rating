import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { BookI } from "../../data-structures";

const getAll = createAsyncThunk("books/getAll", async () => {
  try {
    const response = await axios.get(`${API_URL}/books}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch books");
  }
});

const getById = createAsyncThunk("books/getById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch book");
  }
});

const add = createAsyncThunk<BookI, BookI>(
  "books/add",
  async (newBook: BookI) => {
    try {
      const response = await axios.post(`${API_URL}/books`, newBook);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add book");
    }
  }
);

const booksActions = {
  getAll,
  getById,
  add,
};

export default booksActions;
