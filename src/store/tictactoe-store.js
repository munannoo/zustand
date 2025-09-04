import { create } from "zustand";

const useTicTacToeStore = create((set, get) => ({
  board: ["", "", "", "", "", "", "", "", ""],
  setBoard: (newBoard) => set({ board: newBoard }),

  player: "O",
  setPlayer: () =>
    set((state) => ({
      player: `${state.player === "O" ? "X" : "O"}`,
    })),

  winningCombinations: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ],
  winner: null,
  checkWinner: (newBoard) => {
    const state = get();
    let foundWinner = null;
    for (const combination of state.winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[b] && newBoard[c]) {
        if (newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
          foundWinner = newBoard[a];
        }
      }
    }

    if (foundWinner) {
      set({ winner: foundWinner });
    } else {
      set({ winner: null });
    }
  },

  resetGame: () =>
    set({
      board: ["", "", "", "", "", "", "", "", ""],
      player: "O",
      winner: null,
    }),
}));

export default useTicTacToeStore;
