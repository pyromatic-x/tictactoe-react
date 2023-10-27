import { useSelector } from "react-redux";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NextTurn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 24px;
  font-weight: bold;
`;

const GameName = styled.h1`
  font-size: 4rem;
  line-height: 1;
`;

const ScoreContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  list-style: none;

  & li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

const Crest = styled.div`
  position: relative;
  width: 16px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 1px;
    width: 14px;
    height: 2px;
    border-radius: 3px;
    background-color: var(--blue);
  }

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(135deg);
  }
`;
const Circle = styled.div`
  position: relative;
  width: 16px;

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: transparent;
    border: 2px solid var(--red);
    border-radius: 50%;
    transform: rotate(135deg);
  }
`;

function BoardInfo() {
  const { turn, winner, wins } = useSelector((state) => state.game);

  const next = turn === 1 ? <Crest /> : turn === 2 ? <Circle /> : null;

  return (
    <Header>
      <GameName>TicTacToe</GameName>
      <ScoreContainer>
        <li>
          <Crest /> player: <b> {wins[1]}</b>
        </li>
        <li>
          tie: <b>{wins[0]}</b>
        </li>
        <li>
          <Circle /> player: <b> {wins[2]}</b>
        </li>
      </ScoreContainer>
      <NextTurn>
        {winner === -1 && (
          <>
            <p>Next turn:</p>
            {next}
          </>
        )}
      </NextTurn>
    </Header>
  );
}

export default BoardInfo;
