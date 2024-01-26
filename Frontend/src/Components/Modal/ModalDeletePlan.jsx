import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillBellFill } from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs';

function ModalDeletePlan(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.setShowModal(false)
  }
  const handleShow = () => setShow(true);

  const delPlan = () =>{
    props.deletePlan(props.planID)
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
        <Modal.Header style={{color:"red"}} closeButton >
          <BsFillBellFill />
          <Modal.Title> Atención!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <strong style={{color:"red"}}>Se va a eliminar un plano. Desea continuar?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={delPlan}><BsFillTrashFill /> Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeletePlan;