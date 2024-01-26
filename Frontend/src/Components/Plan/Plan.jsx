import React from "react";
import { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import getPlans from "../PlanManagement/getPlans";
import getCategorys from "../CategoryManagement/getCategorys";
import Loading from "../Loading/Loading";
import Map from '../Map/Map'
import getAllMediaFields from "./getAllMediaFields";
import ViewMediaMap from "../Map/ViewMediaMap";
import MediasLink from "./getMediasLink";
import getAllMediaFieldsSons from "./getAllMediaFieldsSons";

export default function PlanView() {
  const [validated, setValidated] = useState(false);
  const [plans, setPlans] = useState([])
  const [plan, setPlan] = useState()
  const [planDescription, setPlanDescription] = useState("")
  const [categorys, setCategorys] = useState([])
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [medias, setMedias] = useState([])
  const [mediaSons,setMediaSons] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const Plans = async () => {
      setLoading(true)
      let data = await getPlans()
      setPlans(data)
      setLoading(false)

    }
    Plans()
    const Categorys = async () => {
      setLoading(true)
      let data = await getCategorys()
      setCategorys(data)
      setLoading(false)

    }
    Categorys()

  }, [])

  useEffect(() => {

    const Medias = async () => {
      setLoading(true)
      let media_sons = await getAllMediaFieldsSons(description, category, plan.description)
      setMediaSons(media_sons)
      let data = await getAllMediaFields(description, category, plan.description)
      setMedias(data)
      setLoading(false)
    }
    Medias()

  }, [])


  const getPlan = async (value) => {
    setLoading(true)
    setMedias([])
    let data = await getPlans(value)
    setPlan(data)
    if (plan )setPlanDescription(plan.description)
    setLoading(false)
  }

  const getMediasLink = async (description1,description2) => {
    setLoading(true)
    setDescription("")
    setCategory("")
    setMedias([])
    let media_sons1 = await getAllMediaFieldsSons(description1, "", "")
    let media_sons2 = await getAllMediaFieldsSons(description2, "", "")
    setMediaSons([media_sons1[0],media_sons2[0]])
    let data = await MediasLink(description1,description2)
    setMedias(data)
    data.map( (media) => {
      media.plan.description != plan.description && setMediaSons(media_sons2)
      media.plan.description != plan.description && setPlan(media.plan); 
      media.plan.description != plan.description && setMedias([media])
    } )
    setLoading(false)
  }




  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      
      event.stopPropagation();
      setValidated(true);
    }
    else{
      //setMediaSons([])
      const Medias = async () => {
        setLoading(true)
        let media_sons = await getAllMediaFieldsSons(description, category, plan.description)
        setMediaSons(media_sons)
        let data = await getAllMediaFields(description, category, plan.description)
        setMedias(data)
        
        setLoading(false)
      }
      Medias()
    }

    
  };

  return (
    <Container className="border mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mt-3">
          <Col md={3}><Form.Label>Descripción</Form.Label></Col>
          <Col md={3}><Form.Label>Categoría</Form.Label></Col>
          <Col md={3}> <Form.Label>Plano</Form.Label></Col>
        </Row>
        <Row >
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Control  type="text" onChange={(e) => setDescription(e.target.value)}/>
            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Select aria-label="Default select example"  onChange={e => setCategory(e.target.value)}>
              <option selected value="">Todas </option>
              {categorys.map((category) => <option value={category.description}>{category.description}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Select aria-label="Default select example"   required onChange={e => getPlan(e.target.value)}>
              <option selected disabled value="">Seleccione el plano </option>
              {plans.map((plan) => <option value={plan.id}>{plan.description}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Por favor seleccione el Plano
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom03">

            <Button className="mb-3" type="submit" variant="primary"><BsSearch /> Buscar Medios</Button>
          </Form.Group>
        </Row>
      </Form>
      <Row className="mt-3" >
        <div style={{ textAlign: "center" }}>
          {loading && <Loading />}
        </div>
      </Row>
      <Row className="mt-3 mb-3">
        {plan && <h3>Plano: {plan.description}</h3> }
        {plan && <ViewMediaMap image={plan.image} medias={medias}  getMediasLink={getMediasLink} setMedias={setMedias} mediaSons={mediaSons} setMediaSons={setMediaSons}/>}
      </Row>
    </Container>
  );


}