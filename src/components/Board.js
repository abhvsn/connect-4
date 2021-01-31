import React,{useState, useEffect} from "react";
import "../game.css";


export const Player = {
  None : null,
  One : 1,
  Two : 2
}

export const GameState = {
  Ongoing : -1,
  Draw : 0,
  PlayerOneWin : Player.One,
  PlayerTwoWin : Player.Two
}

const intitializeBoard = () => {
  const board = [];
  for (let i = 0; i < 64; i++) {
    board.push(Player.None);
  }
  return board;
};

const getPrettyPlayer = player => {
  if (player === Player.None) return "noPlayer";
  if (player === Player.One) return "playerOne";
  if (player === Player.Two) return "playerTwo";
};

const findLowestEmptyIndex = (board, column) => {
  for (let i = 56 + column; i >= 0; i -= 8) {
    if (board[i] === Player.None) return i;
  }

  return -1;
};

const getGameState = (board) => {
    // Checks wins horizontally
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c <= 4; c++) {
            const index = r * 8 + c;
            const boardSlice = board.slice(index, index + 4);

            const winningResult = checkWinningSlice(boardSlice);
            if (winningResult !== false) return winningResult;
        }
    }

    // check wins vertically
    for (let r = 0; r <= 4; r++) {
        for (let c = 0; c < 8; c++) {
        const index = r * 8 + c;
        const boardSlice = [
            board[index],
            board[index + 8],
            board[index + 8 * 2],
            board[index + 8 * 3]
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) return winningResult;
        }
    }

    // check wins diagonally
    for (let r = 0; r <= 4; r++) {
        for (let c = 0; c < 8; c++) {
            const index = r * 8 + c;

            // Checks diagonal down-left
            if (c >= 3) {
                const boardSlice = [
                    board[index],
                    board[index + 8 - 1],
                    board[index + 8 * 2 - 2],
                    board[index + 8 * 3 - 3]
                ];
        
                const winningResult = checkWinningSlice(boardSlice);
                if (winningResult !== false) return winningResult;
            } 

            // Checks diagonal down-right
            if (c <= 4) {   //7-3
                const boardSlice = [
                    board[index],
                    board[index + 8 + 1],
                    board[index + 8 * 2 + 2],
                    board[index + 8 * 3 + 3]
                ];
        
                const winningResult = checkWinningSlice(boardSlice);
                if (winningResult !== false) return winningResult;
            }
        }
    }

    if (board.some(cell => cell === Player.None)) {
        return GameState.Ongoing
    } else {
        return GameState.Draw
    }
};

const checkWinningSlice = (miniBoard) => {
    if (miniBoard.some(cell => cell === Player.None)) return false;

    if (
        miniBoard[0] === miniBoard[1] &&
        miniBoard[1] === miniBoard[2] &&
        miniBoard[2] === miniBoard[3]
    ) {
        return miniBoard[1];
    }

    return false;
};

const Board = (props) => {
  const { currPlayer, togglePlayerTurn, startNew, resetGame, players,undo } = props;
  const [board, setBoard] = useState(intitializeBoard());
  const [gameState, setGameState] = useState(GameState.Ongoing);
  const [newGame, setNewGame] = useState(true);
  const [undoMove, setUndoMove] = useState(true);
  const [moves, setMoves] = useState([]);

  useEffect(()=>{
    setUndoMove(true)
  },[undo])

  if (startNew && newGame) {
    console.log({ startNew });
    setBoard(intitializeBoard());
    setGameState(GameState.Ongoing);
    setNewGame(false);
  }

  if (undoMove && undo) {
    setUndoMove(false);
    props.undoMove(false);
    const prevMove = moves.slice(moves.length-1);
    const newBoard = board.slice();
    // const move = { index, currPlayer };
    newBoard[prevMove] = null;
    setBoard(newBoard);

    setMoves(prevMoves => {
        let moves = [...prevMoves];
        moves.pop();
        return moves; 
    })
  }

  const renderCells = () => {
    return board.map((player, index) => renderCell(player, index));
  };

  const handleOnClick = (index) => () => {
    if (gameState !== GameState.Ongoing) return;
    const column = index % 8;
    if (!newGame) {
      setNewGame(true);
      resetGame();
    }
    makeMove(column);
  };

  const renderCell = (player, index) => {
    //id 1=>P1 , 2=>P2
    return (
      <div
        className="cell"
        key={index}
        onClick={handleOnClick(index)}
        data-player={getPrettyPlayer(player)}
      >
        {player === null ? null : <img src={players[player - 1].img} />}
      </div>
    );
  };

  const makeMove = (column) => {
    const index = findLowestEmptyIndex(board, column);
    const newBoard = board.slice();
    const move = index;
    newBoard[index] = currPlayer;

    const _gameState = getGameState(newBoard);
    togglePlayerTurn();

    setBoard(newBoard);
    setGameState(_gameState);
    props.getGameState(_gameState);

    setMoves((prevMoves) => {
      let moves = prevMoves;
      moves.push(move);
      return moves;
    });
  };

  return (
    <div className="App">
      <div className="board">{renderCells()}</div>
    </div>
  );
};

export default Board;