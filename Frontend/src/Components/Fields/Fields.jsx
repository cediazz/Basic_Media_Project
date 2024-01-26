import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { BsPencilSquare } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalLinkFieldMedia from '../Modal/ModalLinkField-Media';

export default function Field(props) {

  const [showModal, setShowModal] = useState(false)
  const [inputValue, setInputValue] = useState(props.value || '')
  const [link, setLink] = useState('')

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Asociar Medio
    </Tooltip>
  )

  const pushFields = (value) => {
    //props.setFields([])
    //props.setFields([...props.fields, {id: props.id, value:inputValue}])
    props.setFields({ ...props.fields, [props.id]: {value: inputValue, link:link,idMediaField:props.idMediaField }})
    //setInputValue('');
  }

  useEffect(() => {
    if (inputValue != '')
      pushFields()
  }, [inputValue,link])



  return (
    <>
      <InputGroup >

        <Form.Control required type="text" value={inputValue} onChange={e => { setInputValue(e.target.value) }} />

        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltipEdit}>
          <Button variant="primary" onClick={() => setShowModal(true)} ><BsPencilSquare /></Button>
        </OverlayTrigger>
        <Form.Control.Feedback type="invalid">Por favor complete el campo</Form.Control.Feedback>

      </InputGroup>
      {showModal == true && 
      <ModalLinkFieldMedia 
      fieldID={props.id} 
      fieldName={props.name} 
      fieldValue={props.value} 
      setShowModal={setShowModal} 
      setLink={setLink} 
      />}
    </>


  );
}