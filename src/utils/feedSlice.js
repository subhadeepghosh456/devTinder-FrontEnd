import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    remodeFeed: (state, action) => null,
  },
});

export const { addFeed, remodeFeed } = feedSlice.actions;
export default feedSlice.reducer;
