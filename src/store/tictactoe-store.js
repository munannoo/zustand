import { create } from "zustand";

const useTicTacToeStore = create((set) => ({
  board: ["", "", "", "", "", "", "", "", ""],
  setBoard: (newBoard) => set({ board: newBoard }),

  player: "O",
  setPlayer: () =>
    set((state) => ({
      player: `${state.player === "O" ? "X" : "O"}`,
    })),

  winner: null,
  setWinner: (winnerValue) => set({ winner: winnerValue }),

  resetGame: () =>
    set({
      board: ["", "", "", "", "", "", "", "", ""],
      player: "O",
      winner: null,
    }),
}));

export default useTicTacToeStore;
