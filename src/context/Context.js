import React,{useState} from "react";

const Context = React.createContext();

const ContextProvider = (props) => {
  const [players, setPlayer] = useState([
    {
      id: 1,
      name: "David",
      img: "../Images/avatar01.png",
    },
    {
      id: 2,
      name: "Maria",
      img: "../Images/avatar02.png",
    },
  ]);

  const [gameCnt, setGameCnt] = useState(2);
  const [gameStartTurn, setGameStartTurn] = useState("Alternative turn");

  const playerInfo = ({id,name,img}) => {
    console.log({id,name})
    setPlayer(prevPlayers => {
      const newPlayers = prevPlayers.map(player=>{
        if(player.id === id){
          player.name = name? name:player.name
          player.img = img? img:player.img
        }
        return player;
      })
      return newPlayers;
    })
  }

  return (
    <Context.Provider
      value={{
        playerInfo,
        players,
        gameCnt,
        setGameCnt,
        gameStartTurn,
        setGameStartTurn,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
