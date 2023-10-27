import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import BoardCell from "./BoardCell";
import { onTurn } from "../store/reducers/gameSlice";
import { useCallback } from "react";

const BoardContainer = styled.main`
  display: inline-grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(3, auto);
`;

function Board() {
  const dispatch = useDispatch();
  const { board, turn } = useSelector((state) => state.game);

  const handleOnTurn = useCallback(
    ({ row, col }) => dispatch(onTurn({ row, col })),
    [dispatch]
  );

  return (
    <BoardContainer>
      {board.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <BoardCell
            row={rowIndex}
            col={colIndex}
            value={col}
            turn={turn}
            key={`cell-${rowIndex}-${colIndex}`}
            onClick={handleOnTurn}
          />
        ))
      )}
    </BoardContainer>
  );
}

export default Board;
