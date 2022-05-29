import './App.css';
import React from "react";
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import MenuNavBar from "./componentes/MenuNavBar";
import Inicio from "./componentes/inicio/Incio";
import Login from "./componentes/login_registro/Login";
import Perfil from "./componentes/perfil/Perfil";
import Registro from "./componentes/login_registro/Registro";
import Pedido from "./componentes/restaurante/Pedido";
import R from "./componentes/restaurante/R";
import NotFound from './componentes/inicio/NotFound';

function App() {
  return (
    <Router>
      <header>
        <MenuNavBar />
      </header>
      <div>
        <br />
        <Switch>
          <Route exact path="/inicio" component={Inicio} />
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="login" component={Login} />
          <Route exact path="registro" component={Registro} />
          <Route exact path="/pedido" component={Pedido} />
          <Route exact path="/restaurante/:id" component={R} />
          <Route exact component={NotFound} />
        </Switch>
        <br />
      </div>
    </Router>
  );
}

export default App;
