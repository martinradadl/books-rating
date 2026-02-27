import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helpers/env";
import type { RatingI } from "../../data-structures";

const getRatingDistributionByScore = createAsyncThunk(
  "ratings/getRatingDistributionByScore",
  async (bookId: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/ratings/distribution/${bookId}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to fetch ratings");
    }
  },
);

const add = createAsyncThunk<RatingI, RatingI>(
  "ratings/add",
  async (newRating: RatingI) => {
    try {
      const response = await axios.post(`${API_URL}/ratings`, newRating);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add rating");
    }
  },
);

const ratingsActions = {
  getRatingDistributionByScore,
  add,
};

export default ratingsActions;
