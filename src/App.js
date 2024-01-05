import React from "react";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthProvider from "./contexts/auth";

import Rotas from "./rotas";
import Header from "./components/Header";

export default function App() {

  return (

    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Rotas />
      </AuthProvider>
    </BrowserRouter>
  )
}