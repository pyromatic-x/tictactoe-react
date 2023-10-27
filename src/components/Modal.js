import { useDispatch, useSelector } from "react-redux";
import { newGame } from "../store/reducers/gameSlice";
import styled from "styled-components";

const Overlay = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  pointer-events: all;
  transition: 0.25s ease;

  &.hidden {
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
  }
`;

const Container = styled.div`
  min-width: 300px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 38px 44px;
  gap: 30px;
  pointer-events: all;
  opacity: 1;
  transform: translateY(0px);
  transition: 0.25s ease;

  ${Overlay}.hidden & {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-100px);
  }

  & h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    font-size: 2rem;
  }
`;

const Button = styled.button`
  border: none;
  outline: none;
  padding: 10px 20px;
  width: 100%;
  background-color: var(--green);
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: var(--dark-green) !important;
  }
`;

const Crest = styled.div`
  position: relative;
  width: 22px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0px;
    width: 26px;
    height: 4px;
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
  width: 22px;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: 3px solid var(--red);
    border-radius: 50%;
    transform: rotate(135deg);
  }
`;

function Modal() {
  const dispatch = useDispatch();
  const { winner } = useSelector((state) => state.game);

  return (
    <Overlay className={winner === -1 ? "hidden" : ""}>
      <Container>
        <h3>
          {winner === 0 && <>It's a tie!</>}
          {winner === 1 && (
            <>
              Player <Crest /> wins!
            </>
          )}
          {winner === 2 && (
            <>
              Player <Circle /> wins!
            </>
          )}
        </h3>
        <Button onClick={() => dispatch(newGame())}>New game</Button>
      </Container>
    </Overlay>
  );
}

export default Modal;
