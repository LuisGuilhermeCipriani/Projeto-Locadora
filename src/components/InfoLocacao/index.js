import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from "../../contexts/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import "./infoLocacao.css";

export default function InfoLocacao({ cliente, titulo, estado }) {

    const { alugou, setAlugou } = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dataAtual = new Date();
    const dataFinal = new Date().setDate(dataAtual.getDate() + 3);
    const formatado = new Intl.DateTimeFormat("pt-br", {
        dateStyle: "short"
    })


    async function cadastraLocacao() {

        await api.post(`/locadora/cadastrar/${titulo._id}`, {}, {
            headers: {
                'id_usuario': cliente._id,
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                toast.success("Locação realizada com sucesso!")
            })
            .catch((error) => {
                toast.error("Não foi possível realizar a locação")
            })
    }

    function opcaoSim() {
        handleClose();
        cadastraLocacao();
        setAlugou(!alugou);
    }

    return (

        <div id="InfoLocacao" className="containerInfoLocacao" style={{ display: estado }}>
            <div id="divInfo">
                <span className="infoTitulo">Informações da Locação</span>
                <div className="divTexto">
                    <span className="spanInfo">Alugar título "</span>
                    <strong className="strongInfo">{`${titulo?.titulo}`}</strong>
                    <span className="spanInfo">" para</span>&nbsp;
                    <strong className="strongInfo">{`${cliente?.nome}`}</strong>
                </div>
                <div className="divTexto">
                    <span className="spanInfo">Data da locação:</span>&nbsp;
                    <strong className="strongInfo">{formatado.format(dataAtual)}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="spanInfo">Data final:</span>&nbsp;
                    <strong className="strongInfo">{formatado.format(dataFinal)}</strong>&nbsp;
                </div>
                <div className="divTexto">
                    <span className="spanInfo">Valor à pagar:</span>&nbsp;
                    <strong className="strongInfo">5 R$</strong>&nbsp;
                </div>

                <Button
                    onClick={handleShow}
                    id="btnConfirma"
                    variant="outline-warning"
                    className="btnAlugar"
                >
                    <span>Alugar</span>
                </Button>
            </div>

            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja realmente realizar esta locação?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={handleClose}>
                            Não
                        </Button>
                        <Button variant="outline-success" onClick={() => opcaoSim()}>
                            Sim
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </div>
    )
}