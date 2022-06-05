import './App.css';
import React from "react";
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import uuid from 'react-uuid';
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
          <Route key={uuid()} exact path="/inicio" component={Inicio} />
          <Route key={uuid()} exact path="/perfil" component={Perfil} />
          <Route key={uuid()} exact path="/login" component={Login} />
          <Route key={uuid()} exact path="/registro" component={Registro} />
          <Route key={uuid()} exact path="/pedido" component={Pedido} />
          <Route key={uuid()} exact path="/restaurante/:id" component={R} />
          <Route key={uuid()} exact component={NotFound} />
        </Switch>
        <br />
      </div>
    </Router>
  );
}

export default App;
