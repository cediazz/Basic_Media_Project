import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillBellFill } from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import { categoryDelete,listCategorys } from '../../actions/categoryActions';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ModalDeleteCategory(props) {
  const [show, setShow] = useState(true)
  const dispatch = useDispatch()
  const deleteState = useSelector(state => state.categoryDelete)
  const { loading, error, message } = deleteState
  const {id} = useParams()
  const navigate = useNavigate();

  const delCategory = () =>{
   dispatch(categoryDelete(props.categoryID))
   props.setShowModal(false)
   setShow(false)
   props.setReloadData(true)
  }
  
  
  
  const handleClose = () => {
    setShow(false)
    props.setShowModal(false)
  }
  const handleShow = () => setShow(true);

  

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
        <strong style={{color:"red"}}>Se va a eliminar una categoría. Desea continuar?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={delCategory}><BsFillTrashFill /> Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteCategory;