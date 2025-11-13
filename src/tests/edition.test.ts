import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/editions";
import { configureStore } from "@reduxjs/toolkit";
import editionsReducer from "../redux/reducers/editions";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeEdition, fakeEditionsList } from "./fake-data/edition";

vi.mock("axios");

describe("Edition Actions", () => {
  describe("getAll", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          editions: editionsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should return empty editions list and set error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch editions")
      );

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const editionsState = state.editions;

      expect(editionsState.status).toBe("idle");
      expect(editionsState.editionsList).toEqual([]);
      expect(editionsState.error).toBe("Failed to fetch editions");
    });

    it("should return editions list when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeEditionsList,
      });

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const editionsState = state.editions;

      expect(editionsState.status).toBe("idle");
      expect(editionsState.editionsList).toEqual(fakeEditionsList);
      expect(editionsState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          editions: editionsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterEdition to null", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch edition")
      );

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const editionsState = state.editions;

      expect(editionsState.status).toBe("idle");
      expect(editionsState.selectedEdition).toEqual(null);
      expect(editionsState.error).toBe("Failed to fetch edition");
    });

    it("should return selected edition when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeEdition,
      });

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const editionsState = state.editions;

      expect(editionsState.status).toBe("idle");
      expect(editionsState.selectedEdition).toEqual(fakeEdition);
      expect(editionsState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          editions: editionsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterEdition to null", async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(
        new Error("Failed to add edition")
      );

      await dispatch(actions.add(fakeEdition));

      const state = store.getState() as RootState;
      const editionsState = state.editions;

      expect(editionsState.status).toBe("idle");
      expect(editionsState.selectedEdition).toEqual(null);
      expect(editionsState.error).toBe("Failed to add edition");
    });

    it("should return added edition when status is 200", async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: fakeEdition,
      });

      await dispatch(actions.add(fakeEdition));

      const state = store.getState() as RootState;
      const editionsState = state.editions;

      expect(editionsState.status).toBe("idle");
      expect(editionsState.editionsList).toEqual([fakeEdition]);
      expect(editionsState.error).toBe("");
    });
  });
});
