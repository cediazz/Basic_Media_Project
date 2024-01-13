import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { BsFillBellFill } from 'react-icons/bs';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Alert(props) {
  const [show, setShow] = useState(true);

  return (
    <Row>
      <Col xs={6}>
      <ToastContainer
          className="p-3"
          position='bottom-end'
          style={{ zIndex: 1 }}
        >
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide bg={props.error == true?'danger':'success'} >
          <Toast.Header>
            <BsFillBellFill />
            <strong className="me-auto"> Resultado</strong>
            </Toast.Header>
          <Toast.Body><strong>{props.message}</strong></Toast.Body>
        </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

export default Alert;