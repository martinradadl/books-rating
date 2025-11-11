import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/characters";
import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "../redux/reducers/characters";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeCharacter, fakeCharactersList } from "./fake-data/character";

vi.mock("axios");

describe("Character Actions", () => {
  describe("getAll", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          characters: charactersReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should return empty characters list and set error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch characters")
      );

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const charactersState = state.characters;

      expect(charactersState.status).toBe("idle");
      expect(charactersState.charactersList).toEqual([]);
      expect(charactersState.error).toBe("Failed to fetch characters");
    });

    it("should return characters list when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeCharactersList,
      });

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const charactersState = state.characters;

      expect(charactersState.status).toBe("idle");
      expect(charactersState.charactersList).toEqual(fakeCharactersList);
      expect(charactersState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          characters: charactersReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterCharacter to null", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch character")
      );

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const charactersState = state.characters;

      expect(charactersState.status).toBe("idle");
      expect(charactersState.selectedCharacter).toEqual(null);
      expect(charactersState.error).toBe("Failed to fetch character");
    });

    it("should return selected character when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeCharacter,
      });

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const charactersState = state.characters;

      expect(charactersState.status).toBe("idle");
      expect(charactersState.selectedCharacter).toEqual(fakeCharacter);
      expect(charactersState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          characters: charactersReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterCharacter to null", async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(
        new Error("Failed to add character")
      );

      await dispatch(actions.add(fakeCharacter));

      const state = store.getState() as RootState;
      const charactersState = state.characters;

      expect(charactersState.status).toBe("idle");
      expect(charactersState.selectedCharacter).toEqual(null);
      expect(charactersState.error).toBe("Failed to add character");
    });

    it("should return added character when status is 200", async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: fakeCharacter,
      });

      await dispatch(actions.add(fakeCharacter));

      const state = store.getState() as RootState;
      const charactersState = state.characters;

      expect(charactersState.status).toBe("idle");
      expect(charactersState.charactersList).toEqual([fakeCharacter]);
      expect(charactersState.error).toBe("");
    });
  });
});
