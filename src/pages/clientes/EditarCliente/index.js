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
import './editarCliente.css';
import 'react-toastify/dist/ReactToastify.css';

export default function EditarCliente() {

    const [id, setId] = useState();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const [evento, setEvento] = useState("");

    const { idCliente, setAlterou } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigation = useNavigate();

    useEffect(() => {

        async function carregaCliente() {
            await api.post(`/usuario/listar`, {
                _id: idCliente
            })
                .then((objeto) => {
                    const obj = objeto.data[0];
                    setId(obj._id);
                    setNome(obj.nome);
                    setCpf(obj.cpf);
                    setEmail(obj.email);
                    setDataNascimento(obj.dataNascimento);
                })
        }

        carregaCliente();
    }, [])

    async function editaCliente(e) {
        e.preventDefault();

        if (nome.trim() !== '' && cpf.trim() !== '' && email.trim() !== "" && dataNascimento.trim() !== '') {
            api.put(`/usuario/atualizar/${id}`, {
                nome: nome,
                cpf: cpf,
                email: email,
                dataNascimento: dataNascimento
            })
                .then(() => {
                    handleClose();
                    navigation("/listarClientes");
                    setAlterou(true);
                })
                .catch(() => {
                    toast.error("Não foi possível editar o cliente");
                })
        } else {
            toast.info("Por favor, preencha todos os campos!");
        }
    }

    function modalEditaCliente(e) {
        e.preventDefault();
        setEvento(e);
        handleShow();
    }

    return (

        <div className="containerEditarCliente">
            <ToastContainer style={{ marginTop: 90 }} position="top-left" />

            <Form id="form" onSubmit={modalEditaCliente}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Nome
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormEditarCliente" type="text"
                            name="nome" value={nome}
                            onChange={(e) => setNome(e.target.value)} autoFocus />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        CPF
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormEditarCliente" type="text"
                            name="cpf" value={cpf}
                            onChange={(e) => setCpf(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormEditarCliente" type="text"
                            name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label id="label" column sm="2">
                        Data
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control id="inputFormEditarCliente" type="text"
                            name="dataNascimento" value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)} />
                    </Col>
                </Form.Group>

                <button className="botaoEditarCliente" name="editar" type="submit" ><FaPen size={20}
                    className="penEditarCliente" /><span className="editarCliente">EDITAR</span>
                </button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edição de Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente atualizar os dados deste cliente?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={() => editaCliente(evento)}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}