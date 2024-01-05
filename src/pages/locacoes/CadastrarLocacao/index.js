import React, { useState, useEffect, useContext } from "react";
import { FaSearch, FaInfo } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from "../../../contexts/auth";
import './cadastrarLocacao.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Table from 'react-bootstrap/Table';
import Select from 'react-select'

import InfoLocacao from "../../../components/InfoLocacao";
import Carregando from '../../../components/Carregando/index';

import api from '../../../services/api';

export default function CadastrarLocacao() {

    const { alugou } = useContext(AuthContext);

    const [cpf, setCpf] = useState("");
    const [cliente, setCliente] = useState({});

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [clienteEscolhido, setClienteEscolhido] = useState("");
    const [filmeEscolhido, setFilmeEscolhido] = useState([0]);

    const [filmes, setFilmes] = useState([]);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [infoCliente, setInfoCliente] = useState(true);
    const [infoFilme, setInfoFilme] = useState(true);
    const [nomeFilmeEscolhido, setNomeFilmeEscolhido] = useState("");

    const [estadoDisplay, setEstadoDisplay] = useState("none");

    const options = filmes.map(filme => ({ value: filme, label: filme.titulo }));

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

    }, [])

    useEffect(() => {

        setCpf("");
        setShow(false);
        setShow2(false);
        setClienteEscolhido("");
        setFilmeEscolhido("");
        setOpen(false);
        setOpen2(false);
        setEstadoDisplay("none");
        setInfoCliente(true);
        setInfoFilme(true);
        setNomeFilmeEscolhido("");

    }, [alugou])


    useEffect(() => {
        setEstadoDisplay("none");
        setInfoCliente(true);
        setOpen(false);
        setClienteEscolhido("");
    }, [cpf])

    useEffect(() => {
        setEstadoDisplay("none");
        setInfoFilme(true);
        setOpen2(false);
        setNomeFilmeEscolhido("");
    }, [filmeEscolhido])


    async function carregaCliente(el) {

        await api.post(`/usuario/listar`, {
            cpf: cpf
        })
            .then((item) => {
                setCliente(item.data[0]);
            })
            .catch((error) => {
                console.log("Não foi possível carregar o cliente");
            })
        mostra(el);
    }

    function mostra(el) {
        document.getElementById(el).style.display = 'block';
    }

    function adicionarCliente() {
        setClienteEscolhido(cliente.nome);
        setInfoCliente(false);
        setShow(!show);
    }

    function adicionarFilme() {
        setNomeFilmeEscolhido(filmes[filmeEscolhido].titulo);
        setInfoFilme(false);
        setShow2(!show2);
    }

    function mudarEstado(el) {
        estadoDisplay === "none" ? setEstadoDisplay("block") : setEstadoDisplay("none");
        document.getElementById(el).style.display = estadoDisplay;
    }

    return (
        <div className="containerCadastrarLocacao">
            <ToastContainer style={{ marginTop: 90 }} position="top-left" />

            <div className="area">
                <h5>Dados Obrigatórios</h5>

                <div className="area2">

                    <>
                        <Modal show={show} onHide={handleClose} style={{ marginTop: 90 }}>

                            <Modal.Header closeButton>
                                <Modal.Title>Seleção de Cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <InputGroup id="barraBusca" size="sm">

                                    <Form.Control
                                        placeholder="Digite o cpf do cliente (Apenas números)"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={cpf}
                                        type="text"
                                        onChange={(e) => setCpf(e.target.value)}
                                        autoFocus
                                    />
                                    <InputGroup.Text id="iconeBusca" onClick={() => carregaCliente('textoCPF')}><FaSearch id="FaSearch" /></InputGroup.Text>
                                </InputGroup>

                                <span id="textoCPF" style={{ display: 'none', marginTop: 10 }}>
                                    {
                                        cliente.length > 0 ?

                                            (cpf === cliente.cpf ?
                                                <div>
                                                    {cliente.nome} <span id="adicionar" onClick={() => adicionarCliente()}>Adicionar</span>
                                                </div> : "Digite um CPF válido")
                                            :
                                            <Carregando />
                                    }

                                </span>

                            </Modal.Body>
                            <Modal.Footer>

                            </Modal.Footer>
                        </Modal>
                    </>

                    <InputGroup id="barraNome">
                        <Button variant="dark" onClick={handleShow}>
                            Selecionar Cliente
                        </Button>

                        <Form.Control
                            placeholder={clienteEscolhido}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="text"
                            disabled={true}
                            style={{ fontSize: 15, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
                        />

                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            id="infoCliente"
                            hidden={infoCliente}
                        >
                            <a data-tooltip-id="my-tooltip" data-tooltip-content="Informações do cliente">
                                <FaInfo />
                            </a>
                            <Tooltip id="my-tooltip" />
                        </Button>
                    </InputGroup>

                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <Table striped bordered hover responsive size="sm" id="tableInfo">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Email</th>
                                        <th>Nascimento</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.dataNascimento}</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                    </Collapse>


                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}

                    <>
                        <Modal show={show2} onHide={handleClose2} style={{ marginTop: 90 }}>

                            <Modal.Header closeButton>
                                <Modal.Title>Seleção de Título</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <InputGroup id="barraBusca" size="sm">

                                    <Select
                                        options={options}
                                        id="selectFilmes"
                                        placeholder="Selecione um título"
                                        onChange={(item) => setFilmeEscolhido(options.indexOf(item))}
                                    />

                                    <span id="adicionar" onClick={() => adicionarFilme()}>Adicionar</span>
                                </InputGroup>

                            </Modal.Body>
                            <Modal.Footer>

                            </Modal.Footer>
                        </Modal>
                    </>

                    <InputGroup id="barraNome">
                        <Button variant="dark" onClick={handleShow2}>
                            Selecionar Título
                        </Button>

                        <Form.Control
                            placeholder={nomeFilmeEscolhido}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="text"
                            disabled={true}
                            style={{ fontSize: 15, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
                        />

                        <Button
                            onClick={() => setOpen2(!open2)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open2}
                            id="infoCliente"
                            hidden={infoFilme}
                        >
                            <a data-tooltip-id="my-tooltip" data-tooltip-content="Informações do título">
                                <FaInfo />
                            </a>
                            <Tooltip id="my-tooltip" />
                        </Button>

                    </InputGroup>



                    <Collapse in={open2}>
                        <div id="example-collapse-text">
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Ano</th>
                                        <th>Gênero</th>
                                        <th>Diretor</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>{filmes[filmeEscolhido]?.titulo}</td>
                                        <td>{filmes[filmeEscolhido]?.ano}</td>
                                        <td>{filmes[filmeEscolhido]?.genero}</td>
                                        <td>{filmes[filmeEscolhido]?.diretor}</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                    </Collapse>

                    <Button
                        onClick={() => mudarEstado("InfoLocacao")}
                        id="btnConfirma"
                        hidden={(clienteEscolhido !== "" && nomeFilmeEscolhido !== "" && estadoDisplay === "none") ? false : true}
                        variant="success"
                    >
                        <span>Confirmar Dados</span>
                    </Button>

                </div>

                <InfoLocacao estado={estadoDisplay} cliente={cliente} titulo={filmes[filmeEscolhido]} />

            </div>

        </div>
    )
}