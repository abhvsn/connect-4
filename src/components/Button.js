import React from "react"
const Button = (props) => {
    const {src,btnText,altText,background,color,isActive,minWidth} = props;
    let textColor = color ? null : "#ffffff";
    // let width = minWidth ? null : '12em'; 
    const handleClick = (evt) => {
        isActive ? console.log(btnText) : alert("Coming Soon!");
    }

    return (
      <button
        onClick={handleClick}
        className="home-buttons row-flex-container"
        style={{ background, color:textColor }}
      >
        {src?<img src={src} alt={altText} />:null}
        <span className="button-text">{btnText}</span>
      </button>
    );
}

export default Button;