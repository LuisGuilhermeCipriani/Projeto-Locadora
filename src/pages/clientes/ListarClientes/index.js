import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../services/api';
import './listarClientes.css';
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

import Carregando from "../../../components/Carregando";

export default function ListarClientes() {

    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState("");
    const [apagou, setApagou] = useState(false);
    const [clienteEscolhido, setClienteEscolhido] = useState("");

    const navigation = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editado, setEditado] = useState("");

    const { setIdCliente, alterou } = useContext(AuthContext);

    useEffect(() => {

        async function carregaClientes() {
            await api.get('/usuario/todos')
                .then((item) => {
                    setClientes(item.data);
                })
                .catch((error) => {
                    console.log("Erro ao carregar clientes");
                })
        }
        carregaClientes();
    }, [cliente, apagou])

    useEffect(() => {
        setEditado(alterou);
        if (editado === true) {
            toast.success("Dados do cliente atualizados com sucesso! ");
        }
    }, [editado])

    function buscaClientes() {
        return clientes.filter((item) => item.nome.trim().toUpperCase().includes(cliente.trim().toUpperCase()));
    }

    function navega(id) {
        setIdCliente(id);
        navigation("/editarCliente");
    }

    async function excluiCliente(id, nome) {

        await api.delete(`/usuario/apagar/${id}`)
            .then(() => {
                handleClose();
                toast.success(`Cliente "${nome}" excluído com sucesso!`);
                setApagou(!apagou);
            })
            .catch(() => {
                toast.error("Não foi possível excluir o cliente");
            })
    }

    function modalExcluiCliente(item) {
        setClienteEscolhido(item);
        handleShow();
    }

    return (

        <div className="containerListarClientes">
            <ToastContainer style={{ marginTop: 90 }} position="top-left" />

            <InputGroup id="barraListarClientes" size="lg" className="inputListarClientes">
                <InputGroup.Text id="iconeListarClientes"><FaSearch /></InputGroup.Text>
                <Form.Control
                    placeholder="Digite o nome do cliente"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={cliente}
                    type="text"
                    onChange={(e) => setCliente(e.target.value)}
                    autoFocus
                />
            </InputGroup>

            {
                clientes.length > 0 ?


                    <div id="table-scrollListarClientes">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th id="thTabelaListarClientes" className="cabecalhoListarClientes">Nome do Cliente</th>
                                    <th id="thTabelaListarClientes" className="cabecalhoListarClientes">CPF</th>
                                    <th id="thTabelaListarClientes" className="cabecalhoListarClientes">Email</th>
                                    <th
                                        id="thTabelaListarClientes" className="cabecalhoListarClientes">Data de Nascimento</th>
                                    <th id="thTabelaListarClientes" className="cabecalhoListarClientes" colSpan={2}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {buscaClientes().map((item) => {

                                    return (
                                        <tr key={item._id}>
                                            <td>{item.nome}</td>
                                            <td>{item.cpf}</td>
                                            <td>{item.email}</td>
                                            <td>{item.dataNascimento}</td>
                                            <td id="editarListarClientes">
                                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Editar cliente">
                                                    <FaPen className="penListarClientes" size={30}
                                                        onClick={() => navega(item._id)} />
                                                </a>
                                                <Tooltip id="my-tooltip" />
                                            </td>
                                            <td id="excluirListarClientes">
                                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Excluir cliente">
                                                    <FaTrash className="trashListarClientes" size={30}
                                                        onClick={() => modalExcluiCliente(item)} />
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

                    <Carregando />
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Exclusão de Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir este cliente?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={() => excluiCliente(clienteEscolhido._id, clienteEscolhido.nome)}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}