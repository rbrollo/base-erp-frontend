import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./navigation/PrivateRoute";
import { Login } from "./autenticacao/pages";
import { Dashboard } from "./dashboard/pages";
import { ListaClientes } from "./modulos/clientes/pages/ListaClientes";
import { ListaServicos } from "./modulos/servicos/pages/ListaServicos";
import { MainProvider } from "./context/MainContext";
import Dev from "./Dev";
import App from "./App";
import history from "./navigation/history";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ListaUsuarios from "./modulos/usuarios/pages/ListaUsuarios";
import ListaAtendimentos from "./modulos/atendimentos/pages/ListaAtendimentos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/clientes",
        element: (
          <PrivateRoute>
            <ListaClientes />
          </PrivateRoute>
        ),
      },
      {
        path: "/servicos",
        element: (
          <PrivateRoute>
            <ListaServicos />
          </PrivateRoute>
        ),
      },
      {
        path: "/usuarios",
        element: (
          <PrivateRoute>
            <ListaUsuarios />
          </PrivateRoute>
        ),
      },
      {
        path: "/atendimentos",
        element: (
          <PrivateRoute>
            <ListaAtendimentos />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dev",
    element: <Dev />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainProvider>
    <RouterProvider router={router} history={history} />
  </MainProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
