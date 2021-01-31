import React,{ useState, useContext} from "react"
import {Context} from "../context/Context"

const Avatar = (props) => {
    const {img, id} = props
    const [uploadSrc, setUploadSrc] = useState(img)
    
    const {playerInfo} = useContext(Context)

    const borderContainer =
      id === 1 ? "player1" : id === 2 ? "player2" : "setting-card";
    
    const handleChange = (event) => {
      const newSrc = URL.createObjectURL(event.target.files[0])
      setUploadSrc(newSrc)
      const player = {
        id,
        img : newSrc,
      };
      playerInfo(player)
    }

    return (
      <div
        className={`row-flex-container circle avatar-container ${borderContainer}`}
        style={{padding:"4px"}}
      >
        { id < 3 ? <input
            type="file"
            id={`file${id}`}
            onChange={handleChange}
            style={{ display: "none", height: "0px" }}
          />
          :null
        }
        <label htmlFor={`file${id}`}>
          <img src={uploadSrc} style={{ objectFit:"contain", cursor:"pointer", width:"2.2em" }} alt={`avatar${id}`} />
        </label>
      </div>
    );
}

export default Avatar