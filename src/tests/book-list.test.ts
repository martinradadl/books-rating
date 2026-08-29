import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/book-lists";
import { configureStore } from "@reduxjs/toolkit";
import bookListsReducer from "../redux/reducers/book-list";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeBookList, fakeBookListsList } from "./fake-data/book-lists";
import { fakeGenresList } from "./fake-data/genre";

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
        new Error("Failed to fetch bookLists")
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

  describe("getByTitle", () => {
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
        new Error("Failed to fetch bookList")
      );

      await dispatch(actions.getByTitle({ titleUrl: "fake-title" }));

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

      await dispatch(actions.getByTitle({ titleUrl: "fake-title" }));

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.selectedBookList).toEqual(fakeBookList);
      expect(bookListsState.error).toBe("");
    });
  });

  describe("getByRelatedGenre", () => {
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

    it("should throw error message when status is not 200 and set list of book lists to an empty array", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch list of book lists")
      );

      await dispatch(actions.getByRelatedGenre({ genreUrl: "fake-genre" }));

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.bookListsByGenre).toEqual([]);
      expect(bookListsState.error).toBe("Failed to fetch list of book lists");
    });

    it("should return list of book lists when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: { bookLists: fakeBookListsList, bookListsCount: 2 },
      });

      await dispatch(actions.getByRelatedGenre({ genreUrl: "fake-genre" }));

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.bookListsByGenre).toEqual(fakeBookListsList);
      expect(bookListsState.bookListsCount).toEqual(2);
      expect(bookListsState.error).toBe("");
    });
  });

  describe("getMostCommonRelatedGenres", () => {
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

    it("should return empty related genres list and set error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch related genres")
      );

      await dispatch(actions.getMostCommonRelatedGenres());

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.relatedGenres).toEqual([]);
      expect(bookListsState.error).toBe("Failed to fetch related genres");
    });

    it("should return related genres when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeGenresList,
      });

      await dispatch(actions.getMostCommonRelatedGenres());

      const state = store.getState() as RootState;
      const bookListsState = state.bookLists;

      expect(bookListsState.status).toBe("idle");
      expect(bookListsState.relatedGenres).toEqual(fakeGenresList);
      expect(bookListsState.error).toBe("");
    });
  });
});
