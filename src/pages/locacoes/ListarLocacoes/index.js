import React, { useState, useEffect, useContext } from "react";
import api from '../../../services/api';
import { FaTrash, FaSearch, FaRedo } from 'react-icons/fa';
import { AuthContext } from "../../../contexts/auth";
import { ToastContainer, toast } from "react-toastify";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Tooltip } from 'react-tooltip'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import './listarLocacoes.css';

import Carregando from '../../../components/Carregando/index';

export default function ListarLocacoes() {

    const [cliente, setCliente] = useState('');
    const [apagou, setApagou] = useState(false);
    const [atualizou, setAtualizou] = useState(false);

    const [locacoes, setLocacoes] = useState([]);

    const [locacaoEscolhida, setLocacaoEscolhida] = useState([]);

    const [dataLocacao, setDataLocacao] = useState();
    const [dataFinal, setDataFinal] = useState();
    const [novaDataFinalEscolhida, setNovaDataFinalEscolhida] = useState();

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    useEffect(() => {

        async function carregaLocacoes() {
            await api.get('/locadora/todos')
                .then((item) => {
                    setLocacoes(item.data);
                    setDataLocacao(item?.dataLocacao);
                    setDataFinal(item?.dataFinal);
                })
                .catch((error) => {
                    console.log("Erro ao carregar locações");
                })
        }
        carregaLocacoes();
    }, [cliente, apagou, atualizou])

    async function atualizaLocacao() {
        await api.put(`/locadora/atualizar/${locacaoEscolhida._id}`, {}, {
            headers: {
                'id_usuario': locacaoEscolhida.usuario._id,
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                handleClose();
                toast.success("Locação renovada com sucesso!");
                setAtualizou(!atualizou);
            })
            .catch((error) => {
                toast.error("Não foi possível renovar a locação")
            })
    }

    async function excluiLocacao() {

        await api.delete("/locadora/apagar", {
            data: {
                id: locacaoEscolhida._id,
                id_usuario: locacaoEscolhida.usuario._id
            }
        })
            .then(() => {
                handleClose2();
                toast.success("Locação excluida com sucesso!");
                setApagou(!apagou);
            })
            .catch((error) => {
                toast.error("Não foi possível excluir a locação" + error)
                console.log(error)
            })
    }

    function buscaLocacoes() {
        return locacoes.filter((item) => item.usuario?.nome.trim().toUpperCase().includes(cliente.trim().toUpperCase()));
    }

    function modalRenovaLocacao(item) {
        handleShow();
        setLocacaoEscolhida(item);
        setDataFinal(new Date(item.dataFinal).toLocaleDateString('pt-br'));
        var novaDataFinal = new Date();
        var data = new Date(item.dataFinal);
        novaDataFinal = novaDataFinal.setDate(data.getDate() + 3);
        setNovaDataFinalEscolhida(new Date(novaDataFinal).toLocaleDateString('pt-br'));
    }

    function modalExcluiLocacao(item) {
        setLocacaoEscolhida(item);
        handleShow2();
    }

    return (

        <div className="containerListarLocacoes">
            <ToastContainer style={{ marginTop: 90 }} position="top-left" />

            <InputGroup id="barraListarLocacoes" size="lg" className="inputListarLocacoes">
                <InputGroup.Text id="iconeListarLocacoes"><FaSearch /></InputGroup.Text>
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
                locacoes.length > 0 ?


                    <div id="table-scrollListarLocacoes">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th id="thTabelaListarLocacoes" className="cabecalhoListarLocacoes">Nome do Cliente</th>
                                    <th id="thTabelaListarLocacoes" className="cabecalhoListarLocacoes">CPF</th>
                                    <th id="thTabelaListarLocacoes" className="cabecalhoListarLocacoes">Título</th>
                                    <th id="thTabelaListarLocacoes" className="cabecalhoListarLocacoes">Valor</th>
                                    <th id="thTabelaListarLocacoes" className="cabecalhoListarLocacoes">Data de Locação</th>
                                    <th
                                        id="thTabelaListarLocacoes" className="cabecalhoListarLocacoes" colSpan={2}>Data Final</th>
                                    <th id="thTabelaListarLocacoes" className="cabecalhoListarLocacoes"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {buscaLocacoes().map((item) => {

                                    return (
                                        <tr key={item?._id}>
                                            <td>{item?.usuario.nome}</td>
                                            <td>{item?.usuario.cpf}</td>
                                            <td>{item?.filme?.titulo}</td>
                                            <td>{item?.valor} Reais</td>
                                            <td>{new Date(item?.dataLocacao).toLocaleDateString('pt-br')}</td>
                                            <td>{new Date(item?.dataFinal).toLocaleDateString('pt-br')}</td>
                                            <td id="renovarListarLocacoes">
                                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Renovar locação">
                                                    <FaRedo className="penListarLocacoes" size={30}
                                                        onClick={() => modalRenovaLocacao(item)} />
                                                </a>
                                                <Tooltip id="my-tooltip" />
                                            </td>
                                            <td id="excluirListarLocacoes">
                                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Excluir locação">
                                                    <FaTrash className="trashListarLocacoes"
                                                        size={30} onClick={() => modalExcluiLocacao(item)} />
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
                    <Modal.Title>Renovação da Locação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja renovar a locação de <strong>{locacaoEscolhida.filme?.titulo}</strong> por mais 3 dias?</Modal.Body>
                <Modal.Body>
                    <div className="divAtual">
                        Prazo atual: <span className="infoAtual">{dataFinal}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        Prazo após renovação: <span className="infoRenovacao">{novaDataFinalEscolhida}</span>
                    </div>
                    <div className="divRenovacao">
                        Valor atual: <span className="infoAtual">{locacaoEscolhida.valor} Reais</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Valor após renovação: <span className="infoRenovacao">{locacaoEscolhida.valor + 5} Reais</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={() => atualizaLocacao()}>
                        Renovar Locação
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Exlusão da Locação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir esta locação?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose2}>
                        Não
                    </Button>
                    <Button variant="success" onClick={() => excluiLocacao()}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}