import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/ratings";
import { configureStore } from "@reduxjs/toolkit";
import ratingsReducer from "../redux/reducers/ratings";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeRating, fakeRatingDistribution } from "./fake-data/rating";

vi.mock("axios");

describe("Rating Actions", () => {
  describe("add", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          ratings: ratingsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200", async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(
        new Error("Failed to add rating"),
      );

      await dispatch(actions.add(fakeRating));

      const state = store.getState() as RootState;
      const ratingsState = state.ratings;

      expect(ratingsState.status).toBe("idle");
      expect(ratingsState.currentRating).toEqual(null);
      expect(ratingsState.error).toBe("Failed to add rating");
    });

    it("should return added rating when status is 200", async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: fakeRating,
      });

      await dispatch(actions.add(fakeRating));

      const state = store.getState() as RootState;
      const ratingsState = state.ratings;

      expect(ratingsState.status).toBe("idle");
      expect(ratingsState.currentRating).toEqual(fakeRating.score);
      expect(ratingsState.error).toBe("");
    });
  });

  describe("getRatingDistributionByScore", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          ratings: ratingsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch ratings"),
      );

      await dispatch(actions.getRatingDistributionByScore("fakeBookId"));

      const state = store.getState() as RootState;
      const ratingsState = state.ratings;

      expect(ratingsState.status).toBe("idle");
      expect(ratingsState.distribution).toEqual({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        total: 0,
      });
      expect(ratingsState.error).toBe("Failed to fetch ratings");
    });

    it("should return rating distribution when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeRatingDistribution,
      });

      await dispatch(actions.getRatingDistributionByScore("fakeBookId"));

      const state = store.getState() as RootState;
      const ratingsState = state.ratings;

      expect(ratingsState.status).toBe("idle");
      expect(ratingsState.distribution).toEqual(fakeRatingDistribution);
      expect(ratingsState.error).toBe("");
    });
  });
});
