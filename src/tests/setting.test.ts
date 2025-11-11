import axios from "axios";
import { beforeEach, describe, it, vi, expect } from "vitest";
import actions from "../redux/actions/settings";
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../redux/reducers/settings";
import type { AppDispatch, RootState } from "../redux/store";
import { fakeSetting, fakeSettingsList } from "./fake-data/setting";

vi.mock("axios");

describe("Setting Actions", () => {
  describe("getAll", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          settings: settingsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should return empty settings list and set error message when status is not 200", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch settings")
      );

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const settingsState = state.settings;

      expect(settingsState.status).toBe("idle");
      expect(settingsState.settingsList).toEqual([]);
      expect(settingsState.error).toBe("Failed to fetch settings");
    });

    it("should return settings list when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeSettingsList,
      });

      await dispatch(actions.getAll());

      const state = store.getState() as RootState;
      const settingsState = state.settings;

      expect(settingsState.status).toBe("idle");
      expect(settingsState.settingsList).toEqual(fakeSettingsList);
      expect(settingsState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          settings: settingsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterSetting to null", async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(
        new Error("Failed to fetch setting")
      );

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const settingsState = state.settings;

      expect(settingsState.status).toBe("idle");
      expect(settingsState.selectedSetting).toEqual(null);
      expect(settingsState.error).toBe("Failed to fetch setting");
    });

    it("should return selected setting when status is 200", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({
        status: 200,
        data: fakeSetting,
      });

      await dispatch(actions.getById());

      const state = store.getState() as RootState;
      const settingsState = state.settings;

      expect(settingsState.status).toBe("idle");
      expect(settingsState.selectedSetting).toEqual(fakeSetting);
      expect(settingsState.error).toBe("");
    });
  });

  describe("getById", () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
      vi.resetAllMocks();

      store = configureStore({
        reducer: {
          settings: settingsReducer,
        },
      });

      dispatch = store.dispatch;
    });

    it("should throw error message when status is not 200 and set selecterSetting to null", async () => {
      vi.mocked(axios.post).mockRejectedValueOnce(
        new Error("Failed to add setting")
      );

      await dispatch(actions.add(fakeSetting));

      const state = store.getState() as RootState;
      const settingsState = state.settings;

      expect(settingsState.status).toBe("idle");
      expect(settingsState.selectedSetting).toEqual(null);
      expect(settingsState.error).toBe("Failed to add setting");
    });

    it("should return added setting when status is 200", async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: fakeSetting,
      });

      await dispatch(actions.add(fakeSetting));

      const state = store.getState() as RootState;
      const settingsState = state.settings;

      expect(settingsState.status).toBe("idle");
      expect(settingsState.settingsList).toEqual([fakeSetting]);
      expect(settingsState.error).toBe("");
    });
  });
});
