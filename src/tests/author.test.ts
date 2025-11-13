import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/authors";
import { configureStore } from "@reduxjs/toolkit";
import authorsReducer from "../redux/reducers/authors";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeAuthor, fakeAuthorsList } from "./fake-data/author";

vi.mock("axios");

describe("Author Actions", () => {
  describe("getAll", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          authors: authorsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should return empty authors list and set error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch authors")
      );

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const authorsState = state.authors;

      expect(authorsState.status).toBe("idle");
      expect(authorsState.authorsList).toEqual([]);
      expect(authorsState.error).toBe("Failed to fetch authors");
    });

    it("should return authors list when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeAuthorsList,
      });

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const authorsState = state.authors;

      expect(authorsState.status).toBe("idle");
      expect(authorsState.authorsList).toEqual(fakeAuthorsList);
      expect(authorsState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          authors: authorsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterAuthor to null", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch author")
      );

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const authorsState = state.authors;

      expect(authorsState.status).toBe("idle");
      expect(authorsState.selectedAuthor).toEqual(null);
      expect(authorsState.error).toBe("Failed to fetch author");
    });

    it("should return selected author when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeAuthor,
      });

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const authorsState = state.authors;

      expect(authorsState.status).toBe("idle");
      expect(authorsState.selectedAuthor).toEqual(fakeAuthor);
      expect(authorsState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          authors: authorsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterAuthor to null", async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(
        new Error("Failed to add author")
      );

      await dispatch(actions.add(fakeAuthor));

      const state = store.getState() as RootState;
      const authorsState = state.authors;

      expect(authorsState.status).toBe("idle");
      expect(authorsState.selectedAuthor).toEqual(null);
      expect(authorsState.error).toBe("Failed to add author");
    });

    it("should return added author when status is 200", async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: fakeAuthor,
      });

      await dispatch(actions.add(fakeAuthor));

      const state = store.getState() as RootState;
      const authorsState = state.authors;

      expect(authorsState.status).toBe("idle");
      expect(authorsState.authorsList).toEqual([fakeAuthor]);
      expect(authorsState.error).toBe("");
    });
  });
});
