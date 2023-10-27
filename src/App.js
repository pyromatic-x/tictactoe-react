import styled from "styled-components";
import Board from "./components/Board";
import BoardInfo from "./components/BoardInfo";
import Modal from "./components/Modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 50px;
`;

function App() {
  return (
    <Container>
      <BoardInfo />
      <Board />
      <Modal />
    </Container>
  );
}

export default App;
