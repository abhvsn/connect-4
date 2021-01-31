import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Game from "./pages/Game";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <About />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </>
  );
};

export default App;
