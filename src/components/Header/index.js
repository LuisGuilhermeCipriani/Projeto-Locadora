import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/logo.png';
import './header.css';
import { NavDropdown } from 'react-bootstrap';

export default function Header() {

    return (
        <>
            <Navbar bg="myColor" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand ><img src={Logo} alt="Logo" className="logoHeader" />
                        <span className="marcaHeader">Locadora OSLER</span>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>

                        <NavDropdown title="Clientes" id="nav-dropdown">
                            <NavDropdown.Item href='/cadastrarCliente'>Cadastrar</NavDropdown.Item>
                            <NavDropdown.Item href='/listarClientes'>Listar Todos</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Filmes" id="nav-dropdown">
                            <NavDropdown.Item href='/cadastrarFilme'>Cadastrar</NavDropdown.Item>
                            <NavDropdown.Item href='/listarFilmes'>Listar Todos</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Locações" id="nav-dropdown">
                            <NavDropdown.Item href='/cadastrarLocacao'>Cadastrar</NavDropdown.Item>
                            <NavDropdown.Item href='/listarLocacoes'>Listar Todos</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}