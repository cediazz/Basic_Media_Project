import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillBellFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsFillSignIntersectionFill } from 'react-icons/bs';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function ModalAddField(props) {
    const [show, setShow] = useState(true);
    const [validated, setValidated] = useState(false);
    const [nameField, setNameField] = useState(false);
    const [valueField, setValueField] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
            setValidated(true);
        }
        else {

        }


    };

    const handleClose = () => {
        setShow(false);
        props.setShowModal(false)
    }
    const handleShow = () => setShow(true);

    const addField = () => {

        setShow(false);
        props.setShowModal(false)
    }

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header style={{ color: "blue" }} closeButton >
                    <BsFillSignIntersectionFill />
                    <Modal.Title> Agregar Campo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Nombre del Campo</Form.Label>
                                <Form.Control required type="text" on />
                                <Form.Control.Feedback type='invalid'>Por favor inserte el nombre</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type='invalid'>Por favor inserte el valor</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col md="6"></Col>
                            <Col md="2"><Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button></Col>
                            <Col md="4"> <Button variant="primary" type='submit' ><BsFillSignIntersectionFill /> Agregar</Button></Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalAddField;