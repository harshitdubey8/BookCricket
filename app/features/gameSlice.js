import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    playerNames: null,
    overs: null,
    numberOfPlayers: null,
    currentPlayerBatting: null,
  },
  reducers: {
    addPlayers: (state, action) => {
      state.playerNames = action.payload;
    },
    setOvers: (state, action) => {
      let players = 5;
      const overs = action.payload;
      if (overs === 5) {
        players = 8;
      }
      if (overs === 10) {
        players = 11;
      }
      state.overs = overs;
      state.numberOfPlayers = players;
    },
    setCurrentPlayerBatting: (state, action) => {
      state.currentPlayerBatting = action.payload;
    },
  },
});

export const {
  addPlayers,
  setOvers,
  setCurrentPlayerBatting,
} = gameSlice.actions;

export const selectPlayers = (state) => state.game.playerNames;
export const selectOvers = (state) => state.game.overs;
export const selectNumberOfPlayers = (state) => state.game.numberOfPlayers;
export const selectCurrentPlayer = (state) => state.game.currentPlayerBatting;

export default gameSlice.reducer;
