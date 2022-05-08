import Inicio from "../componentes/inicio/Incio";
import Login from "../componentes/login_registro/Login";
import Perfil from "../componentes/perfil/Perfil";
import Registro from "../componentes/login_registro/Registro";
import Restaurante from "../componentes/restaurante/Restaurante";
import Pedido from "../componentes/restaurante/Pedido";

export const MenuNav = [
  {
    id: 0,
    path: '/inicio',
    title: 'Inicio',
    component: Inicio,
  },
  {
    id: 1,
    path: '/login',
    title: 'Login',
    component: Login,
  },
  {
    id: 2,
    path: '/perfil',
    title: 'Perfil',
    component: Perfil,
  },
  {
    id: 3,
    path: '/registro',
    title: 'Registro',
    component: Registro,
  },
  {
    id: 4,
    path: '/restaurante',
    title: 'Restaurante',
    component: Restaurante,
  },
  {
    id: 5,
    path: '/pedido',
    title: 'Pedido',
    component: Pedido,
  },
];