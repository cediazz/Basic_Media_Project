import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import { BsLink45Deg } from 'react-icons/bs';
import {BsHandThumbsUpFill} from 'react-icons/bs';
import {BsHandThumbsDownFill} from 'react-icons/bs';
import getAllMedias from '../FieldsManagement/getAllMedias';
import Loading from "../Loading/Loading";
import LinkFieldMedias from './linkFieldMedia';
import Alert from 'react-bootstrap/Alert';

function ModalLinkFieldMedia(props) {
    const [show, setShow] = useState(true);
    const [medias, setMedias] = useState([])
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState("")
    const [mediaDescription, setMediaDescription] = useState()
    const [message, setMessage] = useState()
    const [error, setError] = useState(false)

    const handleClose = () => {
        setShow(false);
        props.setShowModal(false)
    }
    const handleShow = () => setShow(true);

    useEffect(() => {

        const Medias = async () => {
            setLoading(true)
            let data = await getAllMedias(description)
            setMedias(data)
            setLoading(false)
        }
        Medias()

    }, [description])

    const LinkFieldMedia =  () => {
       props.setLink(mediaDescription)
       setMessage("Enlace a Medio Creado")
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
                    <BsLink45Deg />
                    <Modal.Title> Agregar Enlace a Medio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="border ">
                        <Row className="mb-3 mt-3">
                            <InputGroup className="mb-3">
                                <Form.Control type="text" onChange={(e) => setDescription(e.target.value)} />
                                <Button variant="primary"><BsSearch /></Button>
                            </InputGroup>
                        </Row>
                        <Row>
                            {medias.map((media) =>
                                <Col md="6">
                                    <Form.Check
                                        type="radio"
                                        name="group1"
                                        value={media.description}
                                        label={media.description}
                                        onChange={(e) => setMediaDescription(e.target.value)}
                                    />
                                </Col>)}
                        </Row>
                        <Row className='mt-3'>
                            <Col md="12">
                                {message != undefined && 
                                <Alert variant={error == true ? "danger" : "success"}>
                                {error == true ? <BsHandThumbsDownFill /> : <BsHandThumbsUpFill />}
                                { message}
                                </Alert>}
                            </Col>
                        </Row>
                        <Row className="mt-3" >
                            <div style={{ textAlign: "center" }}>
                                {loading && <Loading />}
                            </div>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={LinkFieldMedia}>Aceptar</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default ModalLinkFieldMedia;