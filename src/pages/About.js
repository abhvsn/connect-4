import React, { useContext } from "react";
import {Link} from "react-router-dom"
import { Context } from "../context/Context";
import Card from "../components/Card"

const heading = ["Player 01", "Player 02", "Number of game", "Who starts"]

const About = (props) => {

  const { players, gameCnt, setGameCnt, gameStartTurn, setGameStartTurn } = useContext(Context);
  
  const PlayerCards = players.map(({name,id,img}) => (
    <Card key={id} heading={heading[id-1]} name={name} id={id} img={img}/>
  ))

  return (
    <>
      <div className="white-container">
        {PlayerCards}
        <Card
          id={3}
          heading={heading[2]}
          name={`${gameCnt} Games`}
          img={"../Images/winner.png"}
        />
        <Card
          id={4}
          heading={heading[3]}
          name={gameStartTurn}
          img={"../Images/run.png"}
        />
        <hr />
        <br />
        <Link to="/Game">
          <button
            className="btn-style"
            style={{ color: "#fff", background: "#4B7BFF", width: '100%', padding : '10px'}}
          >
            Start Game
          </button>
        </Link>
      </div>
    </>
  );
};

export default About;
