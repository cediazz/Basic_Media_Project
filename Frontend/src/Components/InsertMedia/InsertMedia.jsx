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
import InsertMedias from './insertMedia';
import { useNavigate } from 'react-router-dom';
import getAllMedias from '../FieldsManagement/getAllMedias';
import getAllMediaFields from '../Plan/getAllMediaFields';
import getMediasExclude from '../../Utils/getMediasExclude';
import Field from '../Fields/Fields';

function InsertMedia() {

    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [plan, setPlan] = useState()
    const [plans, setPlans] = useState([])
    const [planSelected, setPlanSelected] = useState("Seleccione el Plano")
    const [category, setCategory] = useState()
    const [categorys, setCategorys] = useState([])
    const [categorySelected, setCategorySelected] = useState("Seleccione la Categoría")
    const [coordinadas, setCoordinadas] = useState()
    const [description, setDescription] = useState()
    const [medias, setMedias] = useState([])
    const [mediasExclude, setMediasExclude] = useState([])
    const [mediaFatherID, setMediaFatherID] = useState()
    const [mediaSonID, setMediaSonID] = useState()
    const [planFather, setPlanFather] = useState()
    const [message, setMessage] = useState()
    const [error, setError] = useState(false)
    const [selectPlanEnabled, setSelectPlanEnabled] = useState(true);
    const [selectPlanFatherEnabled, setSelectPlanFatherEnabled] = useState(false);
    const navigate = useNavigate();
    const [fields, setFields] = useState({})
   
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
        setMessage()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }
        else if (coordinadas == undefined) {
            setMessage("Seleccione las coordenadas en el mapa")
            setError(true)
        }
        /*else if (mediaFatherID == mediaSonID) {
            setMessage("Seleccione Medios distintos")
            setError(true)
        }*/
        else {
            setLoading(true)
            setMessage()
            setError(false)
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

            let data = await InsertMedias(dataForm)
            if (data != 'fail') {
                setMessage("Medio Insertado")


            } else {
                setMessage("El Medio que intenta insertar ya existe, seleccione otra descripción")
                setError(true)
            }
            setLoading(false)


        }
    }

    const getPlan = async (value) => {
        if (value != "No") {
            setLoading(true)
            setMediaFatherID()
            setPlanFather()
            setCoordinadas()
            setPlanSelected(value)
            let data = await getPlans(value)
            setPlan(data)
            setLoading(false)
        }
    }

    const getCategory = async (value) => {
        setLoading(true)
        setCategorySelected(value)
        let data = await getCategorys(value)
        setCategory(data)
        setLoading(false)
    }

    const getMediaFather = async (value) => {
        if (value != "No") {
            setLoading(true)
            setPlan()
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



    return (
        <>
            <Container className="border mt-5">
                <Row>
                    {plan != undefined ? <Map image={plan.image} setCoordinadas={setCoordinadas} />
                        : planFather && <Map image={planFather.image} setCoordinadas={setCoordinadas} coordinadas={coordinadas} />}
                </Row>

                <Form className='mt-3' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select required onChange={e => getCategory(e.target.value)}>
                                <option selected disabled value="">Seleccione la Categoría</option>
                                {categorys.map((category) => <option value={category.id}>{category.description}</option>)}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Por favor seleccione la Categoría</Form.Control.Feedback>
                        </Form.Group>
                        {selectPlanEnabled &&
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Plano</Form.Label>
                                <Form.Select required onChange={e => { getPlan(e.target.value); handleSelectPlanChange(e.target.value) }} >
                                    <option selected disabled value="">Seleccione el Plano</option>
                                    <option value="No">No</option>
                                    {plans.map((plan) => <option value={plan.id}>{plan.description}</option>)}
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
                                    {medias.map((medias) => <option value={medias.description}>{medias.description}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Por favor seleccione el Medio</Form.Control.Feedback>
                            </Form.Group>}
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Adicionarle un Medio</Form.Label>
                            <Form.Select required onChange={(e) => e.target.value != "No" ? setMediaSonID(e.target.value) : setMediaSonID(undefined)} >
                                <option selected disabled >Seleccione el Medio </option>
                                <option value="No">No</option>
                                {mediasExclude.map((medias) => <option value={medias.id}>{medias.description}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control required type="text" onChange={e => setDescription(e.target.value)} />
                            <Form.Control.Feedback type="invalid">Por favor introduzca la Descripción</Form.Control.Feedback>
                        </Form.Group>
                        {category && category.fields.map((field) =>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>{field.name}</Form.Label>
                                <Field id={field.id} fields={fields} setFields={setFields}  />
                               
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


            </Container>
            <Row>{message && <Alert message={message} error={error}></Alert>}</Row>
        </>
    );
}

export default InsertMedia;