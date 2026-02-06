import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/book-lists";
import { configureStore } from "@reduxjs/toolkit";
import bookListsReducer from "../redux/reducers/book-list";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeBookList, fakeBookListsList } from "./fake-data/book-lists";
import { fakeEditionsList } from "./fake-data/edition";

vi.mock("axios");

describe("Book List Actions", () => {
  describe("getAll", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          bookLists: bookListsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should return empty bookLists list and set error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch bookLists"),
      );

      await dispatch(actions.getAll({}));

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.listOfBookLists).toEqual([]);
      expect(bookListsState.error).toBe("Failed to fetch bookLists");
    });

    it("should return bookLists list when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeBookListsList,
      });

      await dispatch(actions.getAll({ limit: 10, page: 1 }));

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.listOfBookLists).toEqual(fakeBookListsList);
      expect(bookListsState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          bookLists: bookListsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selectedBookList to null", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch bookList"),
      );

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.selectedBookList).toEqual(null);
      expect(bookListsState.error).toBe("Failed to fetch bookList");
    });

    it("should return selected bookList when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeBookList,
      });

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.selectedBookList).toEqual(fakeBookList);
      expect(bookListsState.error).toBe("");
    });
  });

  describe("getLatestReleases", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          bookLists: bookListsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set latestReleases to an empty array", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch bookList"),
      );

      await dispatch(actions.getLatestReleases({ limit: 4 }));

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.latestReleases).toEqual([]);
      expect(bookListsState.error).toBe("Failed to fetch bookList");
    });

    it("should return latest releases when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeEditionsList,
      });

      await dispatch(actions.getLatestReleases({ limit: 4 }));

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.latestReleases).toEqual(fakeEditionsList);
      expect(bookListsState.error).toBe("");
    });
  });
});
