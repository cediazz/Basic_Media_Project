import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import { EstadoUsersGlobal } from '../Context/StateUsersGlobals'
import Loading from '../Loading/Loading';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Signin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userContext = React.useContext(EstadoUsersGlobal)
  const [message, setMessage] = useState()
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate()


  const onSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      setValidated(true);
    }
    else {
      setMessage()
      setLoading(true)
      let dataForm = {
        'username': username,
        'password': password
      }
      try {
        let config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForm)
        }

        let res = await fetch('http://127.0.0.1:8000/Login/', config)
        if (res.status != 401) {
          let data = await res.json()
          console.log(data)
          localStorage.setItem('refresh', data.refresh)
          localStorage.setItem('access', data.access)
          localStorage.setItem('expiration', data.expiration)
          localStorage.setItem('username', data.username)
          localStorage.setItem('firstname', data.first_name) // guardar user y token en el Navegador
          //console.log(JSON.parse(localStorage.getItem('user')).token) //si queremos obtener el token del usuario
          userContext.setData(data.username)
          setLoading(false)


        } else {
          setMessage("No se econtro al usuario")
          setLoading(false)
        }

      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
  }



  return (
    <div>

      {error && <h1>{error.message}</h1>}

      {!localStorage.getItem('access') ?
        <MDBContainer className="p-3 my-5">
          <MDBRow>
            <MDBCol col='10' md='6'>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
            </MDBCol>
            <MDBCol col='4' md='6'>
              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control type="text" required onChange={e => setUsername(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Por favor ponga su nombre de usuario
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom02">
                  <Form.Label className='mt-4'>Password</Form.Label>
                  <Form.Control required type="password" onChange={e => setPassword(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Por favor ponga su contraseña
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" className="mt-4 mb-4 w-100" type='submit'>Logearse</Button>
              </Form>
              <div style={{ textAlign: "center" }}>
                {loading && <Loading></Loading>}
              </div>
              {message && <h1>{message}</h1>}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        : navigate("/")}
    </div>
  );
}

export default Signin;