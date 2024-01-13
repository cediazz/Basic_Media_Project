import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsFillSaveFill } from 'react-icons/bs';
import { BsFillSignIntersectionFill } from 'react-icons/bs';
import Loading from "../Loading/Loading";
import Alert from '../Alert/Alert'
import getPlans from "../PlanManagement/getPlans";
import getCategorys from "../CategoryManagement/getCategorys";
import Map from '../Map/Map'
import { useLocation } from 'react-router-dom';
import getMediaFields from './getMediaFields';
import Field from '../Fields/Fields';
import UpdateMedias from './updateMedia';
import { useNavigate } from 'react-router-dom';
import getAllMediaFieldsSons from '../Plan/getAllMediaFieldsSons';
import FieldMediaSon from '../Fields/FieldsMediaSon';
import getMediasExclude from '../../Utils/getMediasExclude';
import getAllMedias from '../FieldsManagement/getAllMedias';
import getAllMediaFields from '../Plan/getAllMediaFields';

function UpdateMedia() {

    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [plan, setPlan] = useState()
    const [plans, setPlans] = useState([])
    const [message, setMessage] = useState()
    const [error, setError] = useState(false)
    const location = useLocation();
    const [mediaData, setMediaData] = useState(location.state)
    const [mediaFields, setMediaFields] = useState([])
    const [planSelected, setPlanSelected] = useState(location.state.planID)
    const [categorySelected, setCategorySelected] = useState(location.state.catID)
    const [description, setDescription] = useState(location.state.description)
    const [coordinadas, setCoordinadas] = useState(location.state.coordinadas)
    const [mediaSons, setMediaSons] = useState([])
    const [fields, setFields] = useState({})
    const [selectPlanEnabled, setSelectPlanEnabled] = useState(true);
    const [selectPlanFatherEnabled, setSelectPlanFatherEnabled] = useState(false);
    const [medias, setMedias] = useState([])
    const [mediasExclude, setMediasExclude] = useState([])
    const [mediaFatherID, setMediaFatherID] = useState()
    const [mediaSonID, setMediaSonID] = useState()
    const [planFather, setPlanFather] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const Plans = async () => {
            setLoading(true)
            let data = await getPlans()
            setPlans(data)
            setLoading(false)

        }
        Plans()
        

        const getMedia = async () => {
            setLoading(true)
            let data = await getMediaFields(mediaData.description)
            setMediaFields(data)
            setLoading(false)
        }
        getMedia()

        const Medias = async () => {
            setLoading(true)
            let data = await getAllMedias()
            setMedias(data)
            setLoading(false)
        }
        Medias()

        const MediasExclude = async () => {
            setLoading(true)
            let data = await getMediasExclude()
            setMediasExclude(data)
            setLoading(false)
        }
        MediasExclude()

        const MediasSons = async () => {
            setLoading(true)
            let media_sons = await getAllMediaFieldsSons(mediaData.description, "", "")
            setMediaSons(media_sons)
            setLoading(false)
        }
        MediasSons()

    }, [])

    const handleSelectPlanChange = (value) => {
        if (value == "No") {
            setSelectPlanEnabled(false);
            setSelectPlanFatherEnabled(true);
        }
    };

    const handleSelectPlanFatherChange = (value) => {
        if (value == "No") {
            setSelectPlanEnabled(true);
            setSelectPlanFatherEnabled(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }
        else {
            setLoading(true)
            let dataForm = {
                coordinadas: { lat: coordinadas.lat, lng: coordinadas.lng },
                description: description,
                category: categorySelected,
                plan: planSelected,
                mediaFatherId: mediaFatherID,
                mediaSonId: mediaSonID,
                fields: fields,
            }
            console.log(dataForm)
            setMessage()
            let data = await UpdateMedias(dataForm, location.state.id)
            if (data != 'fail') {
                setMessage("Medio Editado")

            } else {
                setMessage("El Medio que intenta insertar ya existe")
                setError(true)
            }
            setLoading(false)
            navigate("/gestionar-medios")
                            

        }
    }

    const getPlan = async (value) => {
        if (value != "No") {
            setLoading(true)
            setMediaData()
            setMediaFatherID()
            setPlanFather()
            setCoordinadas()
            setPlanSelected(value)
            let data = await getPlans(value)
            setPlan(data)
            setLoading(false)
        }
    }


    const getMediaFather = async (value) => {
        if (value != "No") {
            setLoading(true)
            setPlan()
            setMediaData()
            let data = await getAllMediaFields(value)
            setMediaFatherID(data[0].id)
            
            setPlanSelected(data[0].plan.id)
            if (data[0].coordinadas)
                setCoordinadas({ lat: data[0].coordinadas.lat, lng: data[0].coordinadas.lng })
            setPlanFather(data[0].plan)
            setLoading(false)
        }
        else setMediaFatherID()
    }

//Arreglar variable mediaData problemas al seleccionar otro plano

    return (
        <>
            <Container className="border mt-5">
                <Row>
                    {mediaData != undefined ?
                        <div>
                           <h3>Plano: {mediaData.planDescription}</h3>
                            <Map image={mediaData.planImage} setCoordinadas={setCoordinadas} coordinadas={mediaData.coordinadas} />
                        </div>
                        : plan ?
                        <div>
                            <h3>Plano: {plan.description}</h3>
                            <Map image={plan.image} setCoordinadas={setCoordinadas} />
                        </div>
                        : planFather && <Map image={planFather.image} setCoordinadas={setCoordinadas} coordinadas={coordinadas} />
                    }
                </Row>

                <Form className='mt-3' noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control required type="text" disabled defaultValue={location.state.catDescription}  />
                            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
                        </Form.Group>
                        {selectPlanEnabled &&
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Plano</Form.Label>
                                <Form.Select required onChange={e => { getPlan(e.target.value); handleSelectPlanChange(e.target.value) }} >
                                    
                                    <option value="No">No</option>
                                    {plans.map((plan) => <option selected={plan.id == location.state.planID} value={plan.id}>{plan.description}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Por favor seleccione el Mapa
                                </Form.Control.Feedback>
                            </Form.Group>}
                        {selectPlanFatherEnabled &&
                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                <Form.Label>Insertar dentro de otro Medio</Form.Label>
                                <Form.Select required onChange={e => { getMediaFather(e.target.value); handleSelectPlanFatherChange(e.target.value) }} >
                                    <option selected disabled value="">Seleccione el Medio</option>
                                    <option value="No">No</option>
                                    {mediasExclude.map((medias) => medias.description != location.state.description && <option value={medias.description}>{medias.description}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Por favor seleccione el Medio</Form.Control.Feedback>
                            </Form.Group>}
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Adicionarle un Medio</Form.Label>
                            <Form.Select required onChange={(e) => e.target.value != "No" ? setMediaSonID(e.target.value) : setMediaSonID(undefined)} >
                                <option selected disabled >Seleccione el Medio </option>
                                <option value="No">No</option>
                                {mediasExclude.map((medias) => medias.description != location.state.description && <option value={medias.id}>{medias.description}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control required type="text" defaultValue={location.state.description} onChange={e => setDescription(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
                        </Form.Group>
                        {mediaFields.length != 0 && mediaFields.map((field) =>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>{field.field.name}</Form.Label>
                                <Field 
                                name={field.field.name} 
                                value={field.field_value} 
                                id={field.field.id}
                                idMediaField={field.id}
                                fields={fields} 
                                setFields={setFields} 
                                />
                            </Form.Group>
                        )
                        }
                    </Row>
                    <Row>
                        {mediaSons[0] != undefined && 
                        <div style={{backgroundColor:"GrayText"}} className="border text-center mt-3 mb-3 pt-1">
                            <h6 className='fw-bold'>CONTIENE</h6>
                        </div>}
                        {mediaSons[0] != undefined &&  mediaSons[0].son_containers.map((son) =>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                          <FieldMediaSon  value={son.son.description} />
                        </Form.Group>
                    )}
                 </Row>
                    <Row className='mt-5'>
                        <Col md={6}>
                            <div className="d-grid gap-2">
                                <Button className="mb-3" onClick={() => navigate("/gestionar-medios")} variant="danger">Cancelar</Button>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="d-grid gap-2">
                                <Button className="mb-3" type="submit" variant="primary"><BsFillSaveFill /> Guardar</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>

                <Row className="mt-3" >
                    <div style={{ textAlign: "center" }}>
                        {loading && <Loading />}
                    </div>
                </Row>
                {message && <Alert message={message} error={error}></Alert>}
            </Container>
        </>
    );
}

export default UpdateMedia;