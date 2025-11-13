import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/genres";
import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../redux/reducers/genres";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeGenre, fakeGenresList } from "./fake-data/genre";

vi.mock("axios");

describe("Genre Actions", () => {
  describe("getAll", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          genres: genresReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should return empty genres list and set error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch genres")
      );

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.genresList).toEqual([]);
      expect(genresState.error).toBe("Failed to fetch genres");
    });

    it("should return genres list when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeGenresList,
      });

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.genresList).toEqual(fakeGenresList);
      expect(genresState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          genres: genresReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterGenre to null", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch genre")
      );

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.selectedGenre).toEqual(null);
      expect(genresState.error).toBe("Failed to fetch genre");
    });

    it("should return selected genre when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeGenre,
      });

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.selectedGenre).toEqual(fakeGenre);
      expect(genresState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          genres: genresReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterGenre to null", async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(
        new Error("Failed to add genre")
      );

      await dispatch(actions.add(fakeGenre));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.selectedGenre).toEqual(null);
      expect(genresState.error).toBe("Failed to add genre");
    });

    it("should return added genre when status is 200", async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: fakeGenre,
      });

      await dispatch(actions.add(fakeGenre));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.genresList).toEqual([fakeGenre]);
      expect(genresState.error).toBe("");
    });
  });
});
