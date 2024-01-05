import React, { useState, useEffect, useContext } from "react";
import { FaPen } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../contexts/auth";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import api from "../../../services/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import './editarFilme.css';
import 'react-toastify/dist/ReactToastify.css';

export default function EditarFilme() {

    const [id, setId] = useState();
    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [genero, setGenero] = useState('');
    const [diretor, setDiretor] = useState('');

    const [evento, setEvento] = useState("");

    const { idFilme, setAlterou } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigation = useNavigate();

    useEffect(() => {

        async function carregaFilme() {
            await api.post(`/filme/listar`, {
                _id: idFilme
            })
                .then((objeto) => {
                    const obj = objeto.data[0];
                    setId(obj._id);
                    setTitulo(obj.titulo);
                    setAno(obj.ano);
                    setGenero(obj.genero);
                    setDiretor(obj.diretor);
                })
        }

        carregaFilme();
    }, [])

    async function editaFilme(e) {
        e.preventDefault();

        if (titulo.trim() !== '' && ano.trim() !== '' && genero.trim() !== "" && diretor.trim() !== '') {
            api.put(`/filme/atualizar/${id}`, {
                titulo: titulo,
                ano: ano,
                genero: genero,
                diretor: diretor
            })
                .then(() => {
                    handleClose();
                    navigation("/listarFilmes");
                    setAlterou(true);
                })
                .catch(() => {
                    toast.error("Não foi possível atualizar os dados do título");
                })
        } else {
            toast.info("Por favor, preencha todos os campos!");
        }
    }

    function modalEditaFilme(e) {
        e.preventDefault();
        setEvento(e);
        handleShow();
    }

    return (

        <div className="containerEditarFilme">
            <ToastContainer style={{ marginTop: 90 }} position="top-left" />

            <Form id="form" onSubmit={modalEditaFilme}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Título
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormEditarFilme" type="text"
                            name="titulo" value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} autoFocus />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Ano
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormEditarFilme" type="text"
                            name="ano" value={ano}
                            onChange={(e) => setAno(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Gênero
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormEditarFilme" type="text"
                            name="genero" value={genero}
                            onChange={(e) => setGenero(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label id="label" column sm="2">
                        Diretor
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormEditarFilme" type="text"
                            name="diretor" value={diretor}
                            onChange={(e) => setDiretor(e.target.value)} />
                    </Col>
                </Form.Group>

                <button className="botaoEditarFilme" name="editar" type="submit" ><FaPen size={20}
                    className="penEditarFilme" /><span className="editarFilme">EDITAR</span></button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edição de Título</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente atualizar os dados deste título?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={() => editaFilme(evento)}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}