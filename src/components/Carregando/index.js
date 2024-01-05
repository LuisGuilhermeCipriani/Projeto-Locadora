import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function Carregando() {

    return (

        <div>
            <Button variant="dark" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
            </Button>{' '}
            <Button variant="dark" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Carregando...
            </Button>
        </div>
    )
}