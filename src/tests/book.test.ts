import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/books";
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../redux/reducers/books";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeBook, fakeBooksList } from "./fake-data/book";

vi.mock("axios");

describe("Book Actions", () => {
  describe("getAll", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          books: booksReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should return empty books list and set error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch books")
      );

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const booksState = state.books;

      expect(booksState.status).toBe("idle");
      expect(booksState.booksList).toEqual([]);
      expect(booksState.error).toBe("Failed to fetch books");
    });

    it("should return books list when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeBooksList,
      });

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const booksState = state.books;

      expect(booksState.status).toBe("idle");
      expect(booksState.booksList).toEqual(fakeBooksList);
      expect(booksState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          books: booksReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterBook to null", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch book")
      );

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const booksState = state.books;

      expect(booksState.status).toBe("idle");
      expect(booksState.selectedBook).toEqual(null);
      expect(booksState.error).toBe("Failed to fetch book");
    });

    it("should return selected book when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeBook,
      });

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const booksState = state.books;

      expect(booksState.status).toBe("idle");
      expect(booksState.selectedBook).toEqual(fakeBook);
      expect(booksState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          books: booksReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterBook to null", async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(
        new Error("Failed to add book")
      );

      await dispatch(actions.add(fakeBook));

      const state = store.getState() as RootState;
      const booksState = state.books;

      expect(booksState.status).toBe("idle");
      expect(booksState.selectedBook).toEqual(null);
      expect(booksState.error).toBe("Failed to add book");
    });

    it("should return added book when status is 200", async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: fakeBook,
      });

      await dispatch(actions.add(fakeBook));

      const state = store.getState() as RootState;
      const booksState = state.books;

      expect(booksState.status).toBe("idle");
      expect(booksState.booksList).toEqual([fakeBook]);
      expect(booksState.error).toBe("");
    });
  });
});
