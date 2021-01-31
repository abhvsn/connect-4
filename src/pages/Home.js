import React from "react";
import {Link} from "react-router-dom"
import Button from "../components/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

const Home = (props) => {
    return (
      <>
        <div className="row-flex-container main-content">
          <div>
            <h1 className="home-header">CONNECT FOUR!</h1>
            <p className="home-para">
              Play with other players around the world.
            </p>
            <span style={{ margin: "1em" }} />
          </div>
          <img
            className="home-image"
            alt="4 Point"
            src="../Images/4inarow.png"
          />
        </div>
        <div className="column-flex-container copywrite-container">
          <div
            className="column-flex-container button-container"
            style={{ background: "white" }}
          >
            <span className="circle circle-top" />
            <div className="home-play column-flex-container">
              <PlayCircleOutlineIcon
                style={{ color: "#ffffff", paddingTop: "1em" }}
              />
              <p style={{ letterSpacing: "2px", color: "#424242" }}>PLAY</p>
            </div>
            <span className="circle circle-right" />
            <hr className="card" style={{margin:'3px auto'}}/>
            <div className="row-flex-container" style={{ marginTop: "2em" }}>
              <Button
                src={"../Images/one.png"}
                btnText={"Custom Game"}
                altText={"Single Player Custom Game"}
                background={"#4BABFF"}
                isActive={false}
              />
              <Link to="/settings">
                <Button
                  src={"../Images/two.png"}
                  btnText={"Two Players"}
                  altText={"Two Player Game"}
                  background={"#4B7BFF"}
                  isActive={true}
                />
              </Link>
            </div>
            <div className="row-flex-container">
              <Button
                src={"../Images/online.png"}
                btnText={"Game Online"}
                altText={"Online Game"}
                background={"#4B4BFF"}
                isActive={false}
              />
              <Button
                src={"../Images/training.png"}
                btnText={"Custom Game"}
                altText={"Training"}
                background={"#6E4BFF"}
                isActive={false}
              />
            </div>
          </div>
          <p style={{ padding: 10, paddingLeft: 60, fontSize: 15 }}>© 2020</p>
        </div>
      </>
    );
};

export default Home;