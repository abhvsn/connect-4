import React,{useContext, useState} from "react"
import {Context} from "../context/Context"
import Avatar from "./Avatar"
import ModalComponent from "./ModalComponent"

const cardColors = ["#DCF6E4", "#F6EFD5"];
const Card = (props) => {
    const {heading,name,id,img} = props
    const { playerInfo } = useContext(Context); //Will be used to update player context & modal data
    const [playerName, setPlayerName] = useState(name)
    const [open, setOpen] = useState(false)
    
    //console.log(name, id, img);    
    const handleChange = (evt) => {
      //evt.preventDefault()
      setPlayerName(evt.target.value)
      const player = {
        id,
        name: evt.target.value,
        img,
      };
      playerInfo(player);
    }

    // const handleClick = (evt) => {
    //   evt.preventDefault()
    //   setSetting(evt.target.getAttribute('setid'))
    //   setOpen(true)
    // }

    const closeModal = () =>{
      console.log("In close modal")
      setOpen(false)
    }

    const openModal = () => {
      console.log("In open modal");
      setOpen(true);
    };

    const displayModal = () => {
      console.log("Display modal")
      return <ModalComponent setType={id} closeModal={closeModal} open={open}/>
    }
    
    return (
      <div
        className="row-flex-container white-container"
        style={{
          background: cardColors[id - 1] || "#EFF3FF",
          padding: "0em",
          paddingLeft: "1em",
          minWidth: "20em",
        }}
      >
        <Avatar key={id} id={id} img={img} />
        <div
          className="column-flex-container"
          style={{ padding: "1em", margin: 0 }}
        >
          <h6>{heading}</h6>
          {id < 3 ? (
            <input
              onChange={handleChange}
              value={playerName}
              style={{ color: "#424242" }}
            />
          ) : (
            <h5 onClick={openModal} setid={id} style={{cursor:'pointer'}}>
              {name}
            </h5>
          )}
          <hr className="card" />
        </div>

        {open ? <div>{displayModal()}</div> : null}
      </div>
    );
}

export default Card