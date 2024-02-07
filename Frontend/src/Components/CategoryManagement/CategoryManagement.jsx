import React from "react";
import { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BsFillSignIntersectionFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';
import Loading from "../Loading/Loading";
import Image from 'react-bootstrap/Image';
import Alert from '../Alert/Alert'
import ModalDeleteCategory from "../Modal/ModalDeleteCategory";
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { listCategorys } from "../../actions/categoryActions";
import SpecificCategory from "../specificCategory/specificCategory";

export default function Category() {
  const [validated, setValidated] = useState(false)
  const [categorySelected, setCategorySelected] = useState("Seleccione la Categoría")
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.categoryList)
  //const { loading, error, categorys } = categoryList
  //const [message, setMessage] = useState()
  const navigate = useNavigate();
  const [reloadData, setReloadData] = useState(false);
  const deleteState = useSelector(state => state.categoryDelete)
  const { loading, error, message,categorys } = deleteState
  //***RESOLVER EL PROBLEMA DE QUE NO ACTUALIZA EL ESTADO DE LAS CATEGORIAS LUEGO DE ELIMINAR ALGUNA*****
  useEffect(() => {
    
    dispatch(listCategorys()) // NO FUNCIONA DESPUES DE EJECUTAR LA ACCION DE ELIMINAR
    console.log("AGAIN")
  }, [reloadData])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      setValidated(true);
    }
    else {
      let uploadData = new FormData()
      uploadData.append('description', description)
      if (image != null)
        uploadData.append('image', image, image.name)
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token}`
        },
        body: uploadData
      }
      //insertData('http://127.0.0.1:8000/Categorys/', config)

    }
  }
   
  

  const refreshCategorys = () => {
    setCategorySelected("Seleccione la Categoría")
    dispatch(listCategorys())
   

  }

  return (
    <Container className="border mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Seleccionar Categoría</Form.Label>
            <Form.Select required value={categorySelected} onChange={e => {setCategorySelected(e.target.value)}}>
              <option selected disabled value="Seleccione la Categoría">Seleccione la Categoría</option>
              {categoryList.categorys && categoryList.categorys.map((category) => <option value={category.id}>{category.description}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Categoría</Form.Label>
            <Form.Control required type="text" maxLength={64} onChange={e => setDescription(e.target.value)} />
            <Form.Control.Feedback type="invalid">Por favor introduzca la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Seleccionar Imagen</Form.Label>
            <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
            <Form.Control.Feedback type="invalid">
              Por favor seleccione la imagen
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col sm={3}>
            <Button className="mb-3" type="submit" variant="outline-primary">
              <BsFillSignIntersectionFill />
              Guardar
            </Button>
          </Col>
          {categorySelected != "Seleccione la Categoría" &&
            <Col sm={9}>
              <Button className="mb-3" onClick={() => setShowModal(true)} variant="outline-danger">
                <BsFillTrashFill />
                Eliminar
              </Button>
            </Col>}
        </Row>
      </Form>
      <Row className="mt-3" >
        <div style={{ textAlign: "center" }}>
          {categoryList.loading && <Loading />}
        </div>
      </Row>
      <Row>
      {categorySelected != "Seleccione la Categoría" && <SpecificCategory id={categorySelected} />}
      </Row>
      <Row>
        {message && <Alert message={message} error={categoryList.error}></Alert>}
      </Row>
      {showModal == true && <ModalDeleteCategory categoryID={categorySelected} setReloadData={setReloadData}  refreshCategorys={refreshCategorys} setShowModal={setShowModal} />}
    {message}
    {categorys}
    </Container>
  );


}