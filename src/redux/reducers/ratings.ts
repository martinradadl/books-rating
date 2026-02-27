import { createSlice } from "@reduxjs/toolkit";
import actions from "../actions/ratings";

interface RatingsState {
  distribution: Record<string, number>;
  currentRating: number | null;
  status: string;
  error: string;
}

const initialState: RatingsState = {
  distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0 },
  currentRating: null,
  status: "idle",
  error: "",
};

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getRatingDistributionByScore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        actions.getRatingDistributionByScore.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.distribution = action.payload;
        },
      )
      .addCase(
        actions.getRatingDistributionByScore.rejected,
        (state, action) => {
          state.status = "idle";
          state.error = action.error.message || "Failed to fetch ratings";
          state.distribution = initialState.distribution;
        },
      )
      .addCase(actions.add.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actions.add.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentRating = action.payload.score;
      })
      .addCase(actions.add.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "Failed to add rating";
        state.currentRating = initialState.currentRating;
      });
  },
});

export default ratingsSlice.reducer;
