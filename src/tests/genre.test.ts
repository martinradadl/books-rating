import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/genres";
import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../redux/reducers/genres";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeDiscoverList, fakeGenre, fakeGenresList } from "./fake-data/genre";

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

      await dispatch(actions.getAll({}));

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

      await dispatch(
        actions.getAll({ limit: 10, page: 1, sortBy: "occurrence" })
      );

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

  describe("getByUrlSlug", () => {
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

      await dispatch(actions.getByUrlSlug("fake-slug"));

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

      await dispatch(actions.getByUrlSlug("fake-slug"));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.selectedGenre).toEqual(fakeGenre);
      expect(genresState.error).toBe("");
    });
  });

  describe("getRelatedGenres", () => {
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

    it("should throw error message when status is not 200 and set relatedGenres to an empty array", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch genres")
      );

      await dispatch(actions.getRelatedGenres({ slug: "fake-slug" }));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.relatedGenres).toEqual([]);
      expect(genresState.error).toBe("Failed to fetch genres");
    });

    it("should return related genres when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeGenresList,
      });

      await dispatch(actions.getRelatedGenres({ slug: "fake-slug" }));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.relatedGenres).toEqual(fakeGenresList);
      expect(genresState.error).toBe("");
    });
  });

  describe("getDiscoverList", () => {
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

    it("should throw error message when status is not 200 and set discoverList to an empty array", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch list")
      );

      await dispatch(actions.getDiscoverList({}));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.discoverList).toEqual([]);
      expect(genresState.error).toBe("Failed to fetch list");
    });

    it("should return discover list when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeDiscoverList,
      });

      await dispatch(actions.getDiscoverList({}));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.discoverList).toEqual(fakeDiscoverList);
      expect(genresState.error).toBe("");
    });
  });

  describe("searchByName", () => {
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

    it("should throw error message when status is not 200 and set searchResults to an empty array", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch list")
      );

      await dispatch(actions.searchByName({ query: "fic" }));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.searchResults).toEqual([]);
      expect(genresState.error).toBe("Failed to fetch list");
    });

    it("should return search results when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeGenresList,
      });

      await dispatch(actions.searchByName({query: "fic"}));

      const state = store.getState() as RootState;
      const genresState = state.genres;

      expect(genresState.status).toBe("idle");
      expect(genresState.searchResults).toEqual(fakeGenresList);
      expect(genresState.error).toBe("");
    });
  });

  describe("Add", () => {
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
