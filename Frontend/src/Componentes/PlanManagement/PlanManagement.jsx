import React from "react";
import { useState,useEffect } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {BsFillSignIntersectionFill} from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs';
import Loading from "../Loading/Loading";
import Image from 'react-bootstrap/Image';
import Alert from '../Alert/Alert'
import getPlans from "./getPlans";
import InsertPlan from "./insertPlan";
import delPlan from "./deletePlan";
import ModalDeletePlan from "../Modal/ModalDeletePlan";
import Map from '../Map/Map'

export default function Plan() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState()
  const [plans, setPlans] = useState([])
  const [planSelected, setPlanSelected] = useState("Seleccione el Plano")
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [message, setMessage] = useState()
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(false)

  useEffect( ()=>{
    const Plans = async () => {
      setLoading(true)
      let data = await getPlans()
      setPlans(data)
      setLoading(false)

    }
    Plans()

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
      setError(false)
      let  data = await InsertPlan(description,image)
      if (data != 'fail'){
      setMessage("Plano Insertado")
      let plans = await getPlans()
      setPlans(plans)
      } else {
      setMessage("El plano que intenta insertar ya existe")
      setError(true)
      }
      setLoading(false)

    }

    
  };

  const getPlan = async (value) => {
    setLoading(true)
    setPlanSelected(value)
    let data = await getPlans(value)
    setPlan(data)
    setLoading(false)
  }

  const deletePlan = async (value) => {
    setLoading(true)
    setMessage()
    let data = await delPlan(value)
    setMessage("Plano eliminado")
    let plans = await getPlans()
    setPlans(plans)
    setPlanSelected("Seleccione el Plano")
    setLoading(false)
  }

  return (
    <>
    <Container className="border mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 mt-3">
        <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Plano</Form.Label>
            <Form.Select value={planSelected} required onChange={e => getPlan(e.target.value)}>
            <option selected disabled  value="Seleccione el Plano">Seleccione el Plano</option>
             {plans.map( (plan)=> <option value={plan.id}>{plan.description}</option> )}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Descripción</Form.Label>
            <Form.Control required type="text" maxLength={255} onChange={e => setDescription(e.target.value)}/>
            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
          </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Seleccionar Archivo</Form.Label>
            <Form.Control required type="file" onChange={ e => setImage(e.target.files[0]) }/>
            <Form.Control.Feedback type="invalid">
              Por favor seleccione el plano
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col sm={3}><Button className="mb-3" type="submit" variant="outline-primary"><BsFillSignIntersectionFill /> Guardar</Button></Col>
          {planSelected != "Seleccione el Plano" &&
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
        {message && <Alert message={message} error={error}></Alert>}
      </Row>
      {showModal == true && <ModalDeletePlan planID={planSelected} deletePlan={deletePlan}  setShowModal={setShowModal} />}
     </Container>
     {plan &&  <Map image={plan.image} />}
   
   </>
  );


}