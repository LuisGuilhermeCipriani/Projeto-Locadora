import React, { useState } from "react";
import { FaCheck } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './cadastrarCliente.css';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../../services/api';

export default function CadastrarCliente() {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const [evento, setEvento] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function cadastraCliente(e) {
        e.preventDefault();

        if (nome.trim() !== '' && cpf.trim() !== '' && email.trim() !== "" && dataNascimento.trim() !== '') {
            api.post(`/usuario/cadastrar`, {
                nome: nome,
                cpf: cpf,
                email: email,
                dataNascimento: dataNascimento
            })
                .then(() => {
                    handleClose();
                    toast.success("Cliente cadastrado com sucesso!");
                    limpaCampos();

                })
                .catch(() => {
                    toast.error("Não foi possível cadastrar o cliente");
                })
        } else {
            handleClose();
            toast.info("Por favor, preencha todos os campos!");
        }
    }

    function limpaCampos() {
        setNome("");
        setCpf("");
        setEmail("");
        setDataNascimento("");
    }

    function modalCadastrarCliente(e) {
        e.preventDefault();
        setEvento(e);
        handleShow();
    }

    return (
        <div className="containerCadastrarCliente">
            <ToastContainer style={{ marginTop: 90 }} position="top-left" />

            <Form id="form" onSubmit={modalCadastrarCliente}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Nome
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            id="inputFormCadastrarCliente" type="text"
                            name="nome" value={nome}
                            onChange={(e) => setNome(e.target.value)} autoFocus />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        CPF
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormCadastrarCliente" type="text"
                            name="cpf" value={cpf}
                            onChange={(e) => setCpf(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormCadastrarCliente" type="text"
                            name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Data
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormCadastrarCliente" type="text" placeholder="DD/MM/AAAA"
                            name="dataNascimento" value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)} />
                    </Col>
                </Form.Group>

                <button className="botaoCadastrarCliente" name="cadastrar" type="submit" ><FaCheck size={20}
                    className="checkCadastrarCliente" /><span className="cadastrarCliente">CADASTRAR</span></button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente cadastrar este cliente?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={() => cadastraCliente(evento)}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}