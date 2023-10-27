import { createSlice } from "@reduxjs/toolkit";

const initialBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const initialState = {
  turn: 1,
  winner: -1,
  board: initialBoard,
  wins: {
    0: 0, // ties
    1: 0, // first player wins
    2: 0, // second player wins
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    onTurn(state, action) {
      const { row, col } = action.payload;

      const board = JSON.parse(JSON.stringify(state.board));
      const wins = JSON.parse(JSON.stringify(state.wins));

      if (!board[row][col]) {
        board[row][col] = state.turn;

        const isEnded = checkIsEnded(board);

        if (isEnded >= 0) {
          wins[isEnded] = wins[isEnded] + 1;
        }

        return {
          turn: state.turn === 1 ? 2 : 1,
          winner: isEnded,
          board,
          wins,
        };
      }
    },
    newGame(state) {
      return {
        turn: 1,
        board: initialBoard,
        winner: -1,
        wins: { ...state.wins },
      };
    },
  },
});

function checkIsEnded(board) {
  const allEqual = (arr) => arr.every((val) => val === arr[0]);

  const lines = board.concat(
    board[0].map((_, colIndex) => board.map((row) => row[colIndex]))
  );

  lines.push([board[0][2], board[1][1], board[2][0]]);
  lines.push([board[0][0], board[1][1], board[2][2]]);

  for (let i = 0; i < lines.length; i++) {
    if (allEqual(lines[i])) {
      if (!lines[i][0]) continue;
      return lines[i][0];
    }
  }

  return board.reduce((acc, val) => [...acc, ...val], []).filter((t) => !t)
    .length
    ? -1
    : 0;
}

export const { onTurn, newGame } = gameSlice.actions;
export default gameSlice.reducer;
