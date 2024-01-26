import React from "react";
import { useState, useEffect } from 'react';
import Loading from "../Loading/Loading";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BsFillSignIntersectionFill } from 'react-icons/bs';
import Alert from '../Alert/Alert'
import useFetch from "../../Hooks/useFetch";

export default function FieldsManagement() {
  const { data, loading, error, message, specificData, refetchData, insertData, fetchData, deleteData } = useFetch()
  const [validated, setValidated] = useState(false)
  const [categorySelected, setCategorySelected] = useState("Seleccione la Categoría")
  const [nameField, setNameField] = useState()

  useEffect(() => {
    fetchData('http://127.0.0.1:8000/Categorys/')
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }
    else {
      let dataForm = {
        name: nameField,
        category: categorySelected
      }
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataForm)
      }
      insertData(`http://127.0.0.1:8000/Fields/`, config)

    }


  };

  return (

    <Container className="border mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Seleccione la categoría</Form.Label>
            <Form.Select required onChange={e => setCategorySelected(e.target.value)}>
              <option selected disabled value="">Seleccione la Categoría</option>
              {data && data.map((category) => <option value={category.id}>{category.description}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
          </Form.Group>

          {categorySelected != "Seleccione la Categoría" &&
            <>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Nombre del Campo</Form.Label>
                <Form.Control type="text" required onChange={e => setNameField(e.target.value)} />
                <Form.Control.Feedback type="invalid">Por favor introduzca el nombre</Form.Control.Feedback>
              </Form.Group>

            </>
          }

        </Row>
        <Row>
          <Col md="4"></Col><Col md="4"><Button variant="primary" type="submit" ><BsFillSignIntersectionFill /> Agregar Campo</Button></Col><Col md="4"></Col>
        </Row>

      </Form>
      <Row className="mt-3">
        <div style={{ textAlign: "center" }}>
          {loading && <Loading />}
        </div>
      </Row>
      {message && <Alert message={message} error={error}></Alert>}
    </Container>




  );


}