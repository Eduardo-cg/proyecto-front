import './App.css';
import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MenuNavBar from "./componentes/MenuNavBar";
import { MenuNav } from "./data/MenuNav";
import R from "./componentes/restaurante/R";

function App() {
  return (
    <Router>
      <header className="App-header">
        <MenuNavBar />
      </header>
      {MenuNav.map((item) => {
        return (
          <Route
            key={item.id}
            path={item.path}
            exact
            component={item.component} />
        );
      })}
      <Route path="/restaurante/:id" component={R} />

    </Router>
  );
}

export default App;
