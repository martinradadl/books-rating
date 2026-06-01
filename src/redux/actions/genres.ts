import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { GenreI } from "../../data-structures";

const getAll = createAsyncThunk(
  "genres/getAll",
  async ({
    limit,
    page,
    sortBy,
    isBrowseGenresList,
  }: {
    limit?: number;
    page?: number;
    sortBy?: string;
    isBrowseGenresList?: boolean;
  }) => {
    try {
      const response = await axios.get(
        `${API_URL}/genres?limit=${limit}&page=${page}&sortBy=${sortBy}`
      );
      return { data: response.data, isBrowseGenresList };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch genres");
    }
  }
);

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

const getByUrlSlug = createAsyncThunk(
  "genres/getByUrlSlug",
  async (slug: string) => {
    try {
      const response = await axios.get(`${API_URL}/genres/slug/${slug}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch genre");
    }
  }
);

const getRelatedGenres = createAsyncThunk(
  "genres/getRelatedGenres",
  async ({ slug, limit }: { slug: string; limit?: number }) => {
    try {
      const response = await axios.get(
        `${API_URL}/genres/related-genres/${slug}?limit=${limit}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch genre");
    }
  }
);

const getDiscoverList = createAsyncThunk(
  "genres/getDiscoverList",
  async ({
    genresLimit,
    editionsLimit,
  }: {
    genresLimit?: number;
    editionsLimit?: number;
  }) => {
    try {
      const response = await axios.get(
        `${API_URL}/genres/discover?genresLimit=${genresLimit}&editionsLimit=${editionsLimit}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch genre");
    }
  }
);

const searchByName = createAsyncThunk(
  "genres/searchByName",
  async ({ query, limit }: { query: string; limit?: number }) => {
    try {
      const response = await axios.get(
        `${API_URL}/genres/search?query=${query}&limit=${limit}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to search genres");
    }
  }
);

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
  getByUrlSlug,
  getRelatedGenres,
  add,
  getDiscoverList,
  searchByName,
};

export default genresActions;
