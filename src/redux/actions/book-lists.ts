import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";

const getAll = createAsyncThunk(
  "bookLists/getAll",
  async ({ limit, page }: { limit?: number; page?: number }) => {
    try {
      const response = await axios.get(
        `${API_URL}/book-lists?limit=${limit}&page=${page}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch book lists");
    }
  },
);

const getById = createAsyncThunk("bookLists/getById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/book-lists/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch book list");
  }
});

const getLatestReleases = createAsyncThunk(
  "bookLists/getLatestReleases",
  async ({ limit }: { limit?: number }) => {
    try {
      const response = await axios.get(
        `${API_URL}/book-lists/latest-releases?limit=${limit}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch book list");
    }
  },
);

const getMostRatedBooks = createAsyncThunk(
  "bookLists/getMostRatedBooks",
  async ({
    limit,
    enableSuggestion,
  }: {
    limit?: number;
    enableSuggestion?: boolean;
  }) => {
    try {
      const response = await axios.get(
        `${API_URL}/book-lists/most-rated?limit=${limit}&&enableSuggestion=${enableSuggestion}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch book list");
    }
  },
);

const getBestRatedBooks = createAsyncThunk(
  "bookLists/getBestRatedBooks",
  async ({
    limit,
    enableSuggestion,
  }: {
    limit?: number;
    enableSuggestion?: boolean;
  }) => {
    try {
      const response = await axios.get(
        `${API_URL}/book-lists/best-rated?limit=${limit}&&enableSuggestion=${enableSuggestion}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch book list");
    }
  },
);

const bookListsActions = {
  getAll,
  getById,
  getLatestReleases,
  getMostRatedBooks,
  getBestRatedBooks,
};

export default bookListsActions;
