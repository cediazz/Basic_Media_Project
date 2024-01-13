import React from "react";
import { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Loading from "../Loading/Loading";
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { BsFillSignIntersectionFill } from 'react-icons/bs';
import TableMedias from "./TablesMedias";
import getMedias from "./getMedias";
import getPlans from "../PlanManagement/getPlans";
import getCategorys from "../CategoryManagement/getCategorys";
import Badge from 'react-bootstrap/Badge';
import MyPagination from "../Pagination/Pagination";
import delMedia from './deleteMedia'
import Alert from '../Alert/Alert'


export default function Media() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false)
  const [medias, setMedias] = useState([])
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [categorys, setCategorys] = useState([])
  const [plan, setPlan] = useState("")
  const [plans, setPlans] = useState([])
  const [cantMedias, setCantMedias] = useState()
  const [pageCount, setPageCount] = useState(0);
  const [del, setDel] = useState(false);
  const itemsPerPage = 2;

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
      let data = await getMedias(1, description, category, plan)
      setCantMedias(data.count)
      setPageCount(Math.ceil(data.count / itemsPerPage))

      setMedias(data.results)
      setLoading(false)
    }
    Medias()

  }, [description, category, plan,del])


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const deleteMedia = async (value) => {
    setLoading(true)
    setMessage()
    let data = await delMedia(value)
    setMessage("Medio eliminado")
    let medias = await getMedias(1, description, category, plan)
    setCantMedias(medias.count)
    setPageCount(Math.ceil(medias.count / itemsPerPage))
    setMedias(medias.results)
    setDel(true)
    setLoading(false)
  }

 

  return (
    <Container className="border mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mt-3">
          <Col md={3}><Form.Label>Descripción</Form.Label></Col>
          <Col md={3}><Form.Label>Categoría</Form.Label></Col>
          <Col md={3}> <Form.Label>Mapa</Form.Label></Col>
        </Row>
        <Row >
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Control type="text" onChange={e => setDescription(e.target.value)} />
            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Select aria-label="Default select example" required onChange={e => setCategory(e.target.value)}>
              <option selected  value="">Ninguno </option>
              {categorys.map((category) => <option value={category.description}>{category.description}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom03">

            <Form.Select aria-label="Default select example" required onChange={e => setPlan(e.target.value)}>
              <option selected  value="">Ninguno </option>
              {plans.map((plan) => <option value={plan.description}>{plan.description}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Por favor seleccione el Mapa
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
      <Row className="mt-3 mb-3">
        <Col sm={4}></Col>
        <Col sm={4}><Link to="/insertar-medio" className="link-dark rounded" style={{ textDecoration: "none" }}><Button variant="primary" ><BsFillSignIntersectionFill /> Agregar Medio</Button></Link></Col>
        <Col sm={4}></Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Badge bg={cantMedias != 0 ? "success": "danger"}><strong>{cantMedias} resultados encontrados</strong></Badge>
      </Row>
      <Row>
        <Col md="12">
          {cantMedias != 0 && <TableMedias data={medias} deleteMedia={deleteMedia} />}
        </Col>
      </Row>
      <Row>
        <Col sm={4}></Col>
        <Col sm={4}>
          {cantMedias != 0 &&
            <MyPagination
              setLoading={setLoading}
              setMedias={setMedias}
              pageCount={pageCount}
              description={description}
              category={category}
              plan={plan}
            />}
        </Col>
        <Col sm={4}></Col>
      </Row>
      <Row className="mt-3" >
        <div style={{ textAlign: "center" }}>
          {loading && <Loading />}
        </div>
      </Row>
      {message && <Alert message={message} error={error}></Alert>}
    </Container>
    
  );


}