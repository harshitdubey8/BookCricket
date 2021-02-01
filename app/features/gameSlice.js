import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    playerNames: null,
    overs: null,
    numberOfPlayers: null,
  },
  reducers: {
    addPlayers: (state, action) => {
      state.playerNames = action.payload;
    },
    setOvers: (state, actions) => {
      state.overs = actions.payload;
    },
  },
});

export const { addPlayers, setOvers } = gameSlice.actions;

export const selectPlayers = (state) => state.game.playerNames;
export const selectOvers = (state) => state.game.overs;
export const selectNumberOfPlayers = (state) => state.game.numberOfPlayers;

export default gameSlice.reducer;
