import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";

const getAll = createAsyncThunk(
  "bookLists/getAll",
  async ({
    limit,
    page,
    itemLimit,
    carouselData,
    booksCount,
  }: {
    limit?: number;
    page?: number;
    itemLimit?: number;
    carouselData?: boolean;
    booksCount?: boolean;
  }) => {
    try {
      const response = await axios.get(
        `${API_URL}/book-lists?limit=${limit}&page=${page}&itemLimit=${itemLimit}&carouselData=${carouselData}&booksCount=${booksCount}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch book lists");
    }
  }
);

const getByTitle = createAsyncThunk(
  "bookLists/getByTitle",
  async ({
    titleUrl,
    limit,
    page,
    isMobile,
  }: {
    titleUrl: string;
    limit?: number;
    page?: number;
    isMobile?: boolean;
  }) => {
    try {
      const response = await axios.get(
        `${API_URL}/book-lists/${titleUrl}?limit=${limit}&page=${page}`
      );

      return { data: response.data, isMobile, isFirstPage: page === 1 };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch book list");
    }
  }
);

const resetStatusToLoading = createAction("bookLists/resetStatusToLoading");

const bookListsActions = {
  getAll,
  getByTitle,
  resetStatusToLoading,
};

export default bookListsActions;
