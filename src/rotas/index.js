import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import CadastrarCliente from "../pages/clientes/CadastrarCliente";
import ListarClientes from "../pages/clientes/ListarClientes";
import EditarCliente from "../pages/clientes/EditarCliente";

import CadastrarFilme from "../pages/filmes/CadastrarFilme";
import ListarFilmes from '../pages/filmes/ListarFilmes';
import EditarFilme from "../pages/filmes/EditarFilme";

import CadastrarLocacao from "../pages/locacoes/CadastrarLocacao";
import ListarLocacoes from "../pages/locacoes/ListarLocacoes";

export default function Rotas() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrarCliente" element={<CadastrarCliente />} />
            <Route path="/listarClientes" element={<ListarClientes />} />
            <Route path="/editarCliente" element={<EditarCliente />} />
            <Route path="/cadastrarFilme" element={<CadastrarFilme />} />
            <Route path="/listarFilmes" element={<ListarFilmes />} />
            <Route path="/editarFilme" element={<EditarFilme />} />
            <Route path="/cadastrarLocacao" element={<CadastrarLocacao />} />
            <Route path="/listarLocacoes" element={<ListarLocacoes />} />
        </Routes>
    )
}