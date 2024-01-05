import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../services/api';
import './listarFilmes.css';
import { FaPen, FaTrash, FaSearch } from 'react-icons/fa';
import { AuthContext } from "../../../contexts/auth";
import { ToastContainer, toast } from "react-toastify";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tooltip } from 'react-tooltip'
import 'react-toastify/dist/ReactToastify.css';

import Carregando from '../../../components/Carregando/index';

export default function ListarFilmes() {

    const [filmes, setFilmes] = useState([]);
    const [filme, setFilme] = useState('');
    const [apagou, setApagou] = useState(false);
    const [filmeEscolhido, setFilmeEscolhido] = useState("");

    const navigation = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editado, setEditado] = useState("");

    const { setidFilme, alterou } = useContext(AuthContext);

    useEffect(() => {

        async function carregaFilmes() {
            await api.get('/filme/todos')
                .then((item) => {
                    setFilmes(item.data);
                })
                .catch((error) => {
                    console.log("Erro ao carregar filmes");
                })
        }
        carregaFilmes();
    }, [filme, apagou])

    useEffect(() => {
        setEditado(alterou);
        if (editado === true) {
            toast.success("Dados do título atualizados com sucesso! ");
        }
    }, [editado])

    function buscaFilmes() {
        return filmes.filter((item) => item.titulo.toUpperCase().includes(filme.toUpperCase()));
    }

    function navega(id) {
        setidFilme(id);
        navigation("/editarFilme");
    }

    async function excluiFilme(id, nome) {

        await api.delete(`/filme/apagar/${id}`)
            .then(() => {
                handleClose();
                toast.success(`Título "${nome}" excluído com sucesso!`);
                setApagou(!apagou);
            })
            .catch(() => {
                toast.error("Não foi possível excluir o título");
            })
    }

    function modalExcluiFilme(item) {
        setFilmeEscolhido(item);
        handleShow();
    }

    return (

        <div className="containerListarFilmes">
            <ToastContainer style={{ marginTop: 90 }} position="top-left" />

            <InputGroup id="barraListarFilmes" size="lg" className="inputListarFilmes">
                <InputGroup.Text id="iconeListarFilmes"><FaSearch /></InputGroup.Text>
                <Form.Control
                    placeholder="Digite o nome do filme"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={filme}
                    type="text"
                    onChange={(e) => setFilme(e.target.value)}
                    autoFocus
                />
            </InputGroup>


            {
                filmes.length > 0 ?


                    <div id="table-scrollListarFilmes">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th id="thTabelaListarFilmes">Título do Filme</th>
                                    <th id="thTabelaListarFilmes" className="cabecalhoListarFilmes">Ano de Produção</th>
                                    <th id="thTabelaListarFilmes" className="cabecalhoListarFilmes">Gênero</th>
                                    <th id="thTabelaListarFilmes" className="cabecalhoListarFilmes">Diretor</th>
                                    <th id="thTabelaListarFilmes" className="cabecalhoListarFilmes" colSpan={2}></th>
                                </tr>
                            </thead>
                            <tbody>

                                {buscaFilmes().map((item) => {

                                    return (
                                        <tr key={item._id}>
                                            <td>{item.titulo}</td>
                                            <td>{item.ano}</td>
                                            <td>{item.genero}</td>
                                            <td>{item.diretor}</td>
                                            <td id="editarListarFilmes">
                                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Editar título">
                                                    <FaPen className="penListarFilmes" size={30}
                                                        onClick={() => navega(item._id)} />
                                                </a>
                                                <Tooltip id="my-tooltip" />
                                            </td>
                                            <td id="excluirListarFilmes">
                                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Excluir título">
                                                    <FaTrash className="trashListarFilmes" size={30}
                                                        onClick={() => modalExcluiFilme(item)} />
                                                </a>
                                                <Tooltip id="my-tooltip" />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    :

                    <Carregando/>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Exclusão de Título</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir este título?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={() => excluiFilme(filmeEscolhido._id, filmeEscolhido.titulo)}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}