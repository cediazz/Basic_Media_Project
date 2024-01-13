import React from "react";
import { useState,useEffect } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {BsFillSignIntersectionFill} from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs';
import getCategorys from "./getCategorys";
import Loading from "../Loading/Loading";
import InsertCategory from "./insertCategory";
import Image from 'react-bootstrap/Image';
import Alert from '../Alert/Alert'
import ModalDeleteCategory from "../Modal/ModalDeleteCategory";
import delCategory from "./deleteCategory";

export default function Category() {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState()
  const [categorys, setCategorys] = useState([])
  const [categorySelected, setCategorySelected] = useState("Seleccione la Categoría")
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [message, setMessage] = useState()
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(false)
 

  useEffect( ()=>{
    const Categorys = async () => {
      setLoading(true)
      let data = await getCategorys()
      setCategorys(data)
      setLoading(false)

    }
    Categorys()

  },[] )

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      
      event.stopPropagation();
      setValidated(true);
    }
    else{
      setLoading(true)
      setMessage()
      let  data = await InsertCategory(description,image)
      if (data != 'fail'){
      setMessage("Categoría Insertada")
      let categorys = await getCategorys()
      setCategorys(categorys)
      } else {
        setMessage("La Categoría que intenta insertar ya existe")
        setError(true)
        }
      setLoading(false)

    }

    
  };

  const getCategory = async (value) => {
    setLoading(true)
    setCategorySelected(value)
    let data = await getCategorys(value)
    setCategory(data)
    setLoading(false)
  }

  const deleteCategory = async (value) => {
    setLoading(true)
    setMessage()
    let data = await delCategory(value)
    setMessage("Categoría eliminada")
    let categorys = await getCategorys()
    setCategorys(categorys)
    setCategorySelected("Seleccione la Categoría")
    setLoading(false)
  }

  

  return (
    <Container className="border mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 mt-3">
        <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Seleccionar Categoría</Form.Label>
            <Form.Select  required value={categorySelected} onChange={e => getCategory(e.target.value)}>
             <option selected disabled  value="Seleccione la Categoría">Seleccione la Categoría</option>
             {categorys.map( (category)=> <option value={category.id}>{category.description}</option> )}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Categoría</Form.Label>
            <Form.Control required type="text" maxLength={64} onChange={e => setDescription(e.target.value)}/>
            <Form.Control.Feedback type="invalid">Por favor introduzca la Categoría</Form.Control.Feedback>
          </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Seleccionar Imagen</Form.Label>
            <Form.Control  type="file" onChange={ e => setImage(e.target.files[0]) }/>
            <Form.Control.Feedback type="invalid">
              Por favor seleccione la imagen
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col sm={3}><Button className="mb-3" type="submit" variant="outline-primary"><BsFillSignIntersectionFill /> Guardar</Button></Col>
          {categorySelected != "Seleccione la Categoría" &&
           <Col sm={9}><Button className="mb-3" onClick={() => setShowModal(true)} variant="outline-danger"><BsFillTrashFill /> Eliminar</Button></Col>
          
          }        
        </Row>
        
      </Form>
      <Row className="mt-3" >
      <div style={{ textAlign: "center" }}>
      {loading && <Loading />}
      </div>
      </Row>
      <Row>
        {category && <Image src={category.image} thumbnail />}
      </Row>
      <Row>
        {message && <Alert message={message} error={error}></Alert>}
      </Row>
      {showModal == true && <ModalDeleteCategory categoryID={categorySelected} deleteCategory={deleteCategory}  setShowModal={setShowModal} />}
      
    </Container>
  );


}