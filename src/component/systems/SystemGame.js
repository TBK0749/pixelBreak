import { useState } from 'react';
import Pixels from '../board/Pixels';

function SystemGame() {

  const [turn, setTurn] = useState(1);

  const [countTurn, setCountTurn] = useState(1);

  const [boardData, setBoardData] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const canClick = (i, j) => {
    if (countTurn === 1) {
      return i === 0 || i === 9;
    } else if (countTurn === 2) {
      if (i !== 0 && i !== 9) {
        return false;
      }
      for (let colIndex = 0; colIndex <= 9; colIndex++) {
        if (boardData[i][colIndex] > 0) {
          return false;
        }
      }
      return true;
    }

    // User can click only where it's not his color
    if (boardData[i][j] === true) {
      return false;
    }

    return hasNeighbor(i, j);
  }

  const isMySquare = (i, j) => {
    return boardData[i][j] === turn;
  };

  const hasNeighbor = (i, j) => {
    const hasTopNeighbor = i - 1 < 0 ? false : isMySquare(i - 1, j);
    const hasBottomNeighbor = i + 1 > 9 ? false : isMySquare(i + 1, j);
    const hasLeftNeighbor = j - 1 < 0 ? false : isMySquare(i, j - 1);
    const hasRightNeighbor = j + 1 > 9 ? false : isMySquare(i, j + 1);

    console.log("Has top neighbor", hasTopNeighbor);
    console.log("Has bottom neighbor", hasBottomNeighbor);
    console.log("Has left neighbor", hasLeftNeighbor);
    console.log("Has right neighbor", hasRightNeighbor);

    return hasTopNeighbor
      || hasBottomNeighbor
      || hasLeftNeighbor
      || hasRightNeighbor;
  };

  const clickedOnBoard = (rowIndex, colIndex) => {
    if (!canClick(rowIndex, colIndex)) {
      return;
    }

    let fromColIndex = colIndex - 3;
    let toColIndex = colIndex + 3;

    if (fromColIndex < 0) fromColIndex = 0;
    if (toColIndex > 9) toColIndex = 9;

    let tempBoardData = [...boardData];

    // console.log(`Clicked in row ${rowIndex} col ${colIndex}`);

    // for(initilize;condition;finishedloop) {}
    // i = 1, 1 <= 7
    // tempBoardData[0][1] = 1;
    // i = 2
    // tempBoardData[0][2] = 1;
    // tempBoardData[0][7] = 1

    for (let currentColumnIndex = fromColIndex; currentColumnIndex <= toColIndex; currentColumnIndex++) {
      // console.log(`Trying to change row ${rowIndex} col ${currentColumnIndex} to ${turn}`);
      tempBoardData[rowIndex][currentColumnIndex] = turn;
    }

    setBoardData(tempBoardData);
    setTurn(turn === 1 ? 2 : 1);
    setCountTurn(countTurn + 1);
  };

  // const [boardData, setBoardData] = useState([
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ]);

  // clickedOnBoard(rowIndex, colIndex)

  return (
    <div>
      <h1>Count turn: {countTurn}</h1>
      {boardData.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((col, colIndex) => (
            <Pixels key={colIndex} value={col} clickedOnBoard={() => clickedOnBoard(rowIndex, colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SystemGame;