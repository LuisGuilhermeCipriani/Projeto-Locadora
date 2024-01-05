import React from "react";
import Accordion from 'react-bootstrap/Accordion';

export default function Home() {

    return (
        <Accordion defaultActiveKey="0" style={{ width: '50%', marginLeft: '25%', marginTop: '10%' }}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Bem Vindo à Locadora Osler!</Accordion.Header>
                <Accordion.Body>
                    <p>Aqui você poderá cadastrar clientes, títulos e locações, bem como editá-los.</p>
                    <p>Listas de todos os clientes, títulos e locações poderão ser exibidas.</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}