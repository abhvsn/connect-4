import React,{useContext, useState, useEffect} from "react"
import Board,{Player, GameState} from "../components/Board"
import { Context } from "../context/Context";

const tournamentState = {
    player1 : 0,
    player2 : 1,
    draw: 2
}
const initialStats = {
    lastWinner : null,
    draw:0,
    player1 : {
        won : 0,
        lost : 0
    },
    player2 : {
        won : 0,
        lost : 0
    }
}

export default function Game () {
    const {
      players,
      gameStartTurn,
      gameCnt
    } = useContext(Context);
    const [currPlayer, setCurrPlayer] = useState(Player.One);
    const [gameState, setGameState] = useState(GameState.Ongoing);
    const [stats, setStats] = useState(initialStats)
    const [startNew , setStartNew] = useState(false)
    const [matchWinCnt, setMatchWinCnt] = useState(Number.MAX_SAFE_INTEGER)
    const [winner, setWinner] = useState(null)  //0:P1,1:P2,2:Draw
    const [undo, setUndo] = useState(false)

    useEffect(()=>{
        let reqMatchWinCnt = Math.floor(gameCnt/2)
        setMatchWinCnt(reqMatchWinCnt)
    }, [gameCnt])
    
    const resetGame = () => {
        setStartNew(prevState => !prevState)
        if(winner !== null || winner === tournamentState.draw){
            setStats(initialStats);
            setGameState(GameState.Ongoing);
            setWinner(null);    
        }
    }

    const endTournament = () => {
        resetGame();
        setStats(initialStats);
        setGameState(GameState.Ongoing);
        setWinner(null)
    };

    const tourWinner = () => {
        console.log("in tour winner")
        if(stats.player1.lost + stats.player1.won + stats.draw === gameCnt 
            || stats.player1.won > matchWinCnt 
            || stats.player2.won > matchWinCnt){
                
                const tournamentWinner =
                  stats.player1.won > stats.player2.won
                    ? (Player.One-1)
                    : (stats.player1.won === stats.player2.won) ? tournamentState.draw : (Player.Two-1);  
                
                if (winner === null) setWinner(tournamentWinner);
                if(tournamentWinner === tournamentState.draw){
                    return <h4>Tournament Draw</h4>
                }
                return(
                    <h4 ><b>{players[tournamentWinner].name}</b>, you won the tournament. </h4>
                )
            }   
        return null;     
    }

    const togglePlayerTurn = () => {
        setCurrPlayer( prevPlayer => prevPlayer === Player.One ? Player.Two : Player.One)
    };

    const getGameState = (state) => {
        if(state !== gameState){
            setGameState(state);
            setStats(prevStats => {
                const newStats = {
                    ...prevStats,
                    player1: { ...prevStats.player1 },
                    player2: { ...prevStats.player2 },
                };
                if (state === GameState.PlayerOneWin) {
                    newStats.lastWinner = Player.One
                    newStats.player1.won =  prevStats.player1.won + 1
                    newStats.player2.lost = prevStats.player2.lost + 1
                } else if (state === GameState.PlayerTwoWin) {
                    newStats.lastWinner = Player.Two
                    newStats.player2.won = prevStats.player2.won + 1
                    newStats.player1.lost = prevStats.player1.lost + 1
                } else if(state === GameState.Draw) {
                    newStats.draw = prevStats.draw + 1; 
                }
                return newStats
            })        
        } 
    }

    const undoMove = (state = true) => {
        setUndo(state)
        togglePlayerTurn()
    }

    return (
      <div
        className="row-flex-container white-container"
        style={{ padding: "0px", background: "#F5F5F5" }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "20px",
            margin: "0px",
          }}
        >
          <Board
            players={players}
            currPlayer={currPlayer}
            togglePlayerTurn={togglePlayerTurn}
            getGameState={getGameState}
            startNew={startNew}
            resetGame={resetGame}
            undoMove={undoMove}
            undo={undo}
          />
        </div>

        <div
          className="column-flex-container main-content"
          style={{ padding: "10px 20px", alignItems: "center" }}
        >
          <h2>{gameCnt > 1 ? `${gameCnt} Games Tournament` : `Single Game`}</h2>
          {gameState === GameState.Ongoing || GameState.Draw ? (
            <h3>
              Playing Game{" "}
              {Math.min(
                stats.player1.lost + stats.player1.won + stats.draw + 1,
                gameCnt
              )}
            </h3>
          ) : (
            <div style={{textAlign:"center"}}>
              <h2 style={{ color: "#FF6600" }}>Congratulations!</h2>
              <h4>
                {players[stats.lastWinner - 1].name}, You won Game{" "}
                {Math.min(
                  stats.player1.lost + stats.player1.won + stats.draw,
                  gameCnt
                )}
              </h4>

              {tourWinner()}
            </div>
          )}
          <h5>
            P1 : {players[0].name}, Score : {stats.player1.won}
          </h5>
          <h5>
            P2 : {players[1].name}, Score : {stats.player2.won}
          </h5>
          {/* <h6>
            Player turn : {currPlayer}, GameState : {renderGameStatus()}
          </h6> */}
          <br />
          {gameState === GameState.Ongoing ? (
            <button
              onClick={undoMove}
              className="btn-style"
              style={{ color: "#fff", background: "#4B7BFF", width: "100%" }}
            >
              Undo Step
            </button>
          ) : (
            <button
              onClick={resetGame}
              className="btn-style"
              style={{ color: "#fff", background: "#4B7BFF", width: "100%" }}
            >
              Next Game
            </button>
          )}
          <br />
          <button
            onClick={endTournament}
            className="btn-style"
            style={{ color: "#CC0000", background: "#fff", width: "100%" }}
          >
            End Tournament
          </button>
        </div>
      </div>
    );
}