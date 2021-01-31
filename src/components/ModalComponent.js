import React, { useContext } from "react";
import { Modal } from "@material-ui/core";
import { Context } from "../context/Context";

const gameCnt = [2,3,5,10]
const whoStart = ["Alternative turn","Looser first","Winner first", "Always player 01", "Always player 02"]
const ModalComponent = ({setType,closeModal,open}) => {
    //setType = 3 => GameCnt, 4=>whoStart 
    const {setGameCnt, setGameStartTurn} = useContext(Context) 
    //No of games & Who starts
    
    const handleChange = (event) => {
        let idx = event.target.value
        setType===3?setGameCnt(gameCnt[idx]):setGameStartTurn(whoStart[idx]);

    }

    const uList = () => {
        let arr = []
        if(setType === 3){
            arr = gameCnt.filter(ele => ele!==undefined)
        } else {
            arr = whoStart.filter(ele => ele!==undefined)
        }
        return arr.map((element,idx,arr) => {
            return (
              <div onChange={handleChange} key={idx}>
                <input type="radio" name="action" value={idx} />
                {setType === 3 ? `${element} Games` : element}
                <br />
              </div>
            );
        })
    }

    console.log("In ModalCompo")
    return (
      <Modal
        open={open}
        onClose={() => closeModal()}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <h5 className="white-container">{uList()}</h5>
      </Modal>
    );
}

export default ModalComponent