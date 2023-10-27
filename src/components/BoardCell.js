import styled from "styled-components";
import { memo, useState } from "react";

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 140px;
  height: 140px;
  cursor: pointer;
  opacity: ${(props) => props};

  &.crest,
  &.circle {
    cursor: not-allowed;
  }

  &.crest::before,
  &.crest::after,
  &:not(.crest):not(.circle).next-crest::before,
  &:not(.crest):not(.circle).next-crest::after {
    content: "";
    position: absolute;
    top: 60px;
    width: 120px;
    height: 8px;
    background-color: var(--blue);
    border-radius: 8px;
  }

  &.crest::before,
  &.next-crest::before {
    transform: rotate(45deg);
  }
  &.crest::after,
  &.next-crest::after {
    transform: rotate(135deg);
  }

  &.circle::before,
  &:not(.crest):not(.circle).next-circle::before {
    content: "";
    position: absolute;
    top: calc(50% - 52px);
    left: calc(50% - 52px);
    width: 90px;
    height: 90px;
    background-color: transparent;
    border: 7px solid var(--red);
    border-radius: 50%;
    transform: rotate(135deg);
  }

  &:not(.crest):not(.circle)&.next-crest::before,
  &:not(.crest):not(.circle)&.next-crest::after,
  &:not(.crest):not(.circle)&.next-circle::before {
    opacity: 0.7;
  }

  &:nth-child(-n + 6) {
    border-bottom: 10px solid var(--dark-green);
  }

  &:nth-child(2),
  &:nth-child(5),
  &:nth-child(8) {
    border-right: 10px solid var(--dark-green);
    border-left: 10px solid var(--dark-green);
  }
`;

const BoardCell = memo(function BoardCell({ row, col, value, turn, onClick }) {
  const [isHovering, setIsHovering] = useState(false);

  const mouseOver = () => setIsHovering(true);
  const mouseOut = () => setIsHovering(false);

  const mark = value === 1 ? "crest" : value === 2 ? "circle" : "";
  const next = turn === 1 ? "crest" : turn === 2 ? "circle" : "";

  return (
    <Cell
      onClick={() => onClick({ row, col })}
      className={`${mark} ${isHovering ? `next-${next}` : ""}`}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    />
  );
});

export default BoardCell;
