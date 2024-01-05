import React, { useState } from "react";
import { FaCheck } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './cadastrarFilme.css';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../../services/api';

export default function CadastrarFilme() {

    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [genero, setGenero] = useState('');
    const [diretor, setDiretor] = useState('');

    const [evento, setEvento] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function cadastraFilme(e) {
        e.preventDefault();

        if (titulo.trim() !== '' && ano.trim() !== '' && genero.trim() !== "" && diretor.trim() !== '') {
            api.post(`/filme/cadastrar`, {
                titulo: titulo,
                ano: ano,
                genero: genero,
                diretor: diretor
            })
                .then(() => {
                    handleClose();
                    toast.success("Título cadastrado com sucesso!");
                    limpaCampos();

                })
                .catch(() => {
                    toast.error("Não foi possível cadastrar o título");
                })
        } else {
            handleClose();
            toast.info("Por favor, preencha todos os campos!");
        }
    }

    function limpaCampos() {
        setTitulo("");
        setAno("");
        setGenero("");
        setDiretor("");
    }

    function modalCadastrarFilme(e) {
        e.preventDefault();
        setEvento(e);
        handleShow();
    }

    return (
        <div className="containerCadastrarFilme">
            <ToastContainer style={{ marginTop: 90 }} position="top-left" />

            <Form id="form" onSubmit={modalCadastrarFilme}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Título
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormCadastrarFilme" type="text"
                            name="titulo" value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} autoFocus />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Ano
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormCadastrarFilme" type="text"
                            name="ano" value={ano}
                            onChange={(e) => setAno(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Gênero
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormCadastrarFilme" type="text"
                            name="genero" value={genero}
                            onChange={(e) => setGenero(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Diretor
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormCadastrarFilme" type="text"
                            name="diretor" value={diretor}
                            onChange={(e) => setDiretor(e.target.value)} />
                    </Col>
                </Form.Group>

                <button className="botaoCadastrarFilme" name="cadastrar" type="submit" ><FaCheck size={20}
                    className="checkCadastrarFilme" /><span className="cadastrarFilme">CADASTRAR</span></button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de Título</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente cadastrar este título?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={() => cadastraFilme(evento)}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}