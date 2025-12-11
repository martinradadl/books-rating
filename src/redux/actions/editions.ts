import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { EditionI } from "../../data-structures";

const getAll = createAsyncThunk("editions/getAll", async () => {
  try {
    const response = await axios.get(`${API_URL}/editions`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch editions");
  }
});

const getById = createAsyncThunk("editions/getById", async (id: string) => {
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

const getMoreEditionsFromBook = createAsyncThunk(
  "editions/getMoreEditionsFromBook",
  async ({ id, bookId }: { id: string; bookId: string }) => {
    try {
      const response = await axios.get(
        `${API_URL}/editions/more-editions?editionId=${id}&bookId=${bookId}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch more editions");
    }
  }
);

const getBooksBySameAuthor = createAsyncThunk(
  "editions/getBooksBySameAuthor",
  async ({ authorId, bookId }: { authorId: string; bookId: string }) => {
    try {
      const response = await axios.get(
        `${API_URL}/editions/same-author?authorId=${authorId}&bookId=${bookId}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch books by same author");
    }
  }
);

const getRelatedBooks = createAsyncThunk(
  "editions/getRelatedBooks",
  async ({ authorId, bookId }: { authorId: string; bookId: string }) => {
    try {
      const response = await axios.get(
        `${API_URL}/editions/related-books?authorId=${authorId}&bookId=${bookId}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch related books");
    }
  }
);

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

const cleanUp = createAction("editions/cleanUp");

const editionsActions = {
  getAll,
  getById,
  getMoreEditionsFromBook,
  getBooksBySameAuthor,
  getRelatedBooks,
  add,
  cleanUp,
};

export default editionsActions;
