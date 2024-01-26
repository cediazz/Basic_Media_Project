import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { BsFillTrashFill } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalLinkFieldMedia from '../Modal/ModalLinkField-Media';

export default function FieldMediaSon(props) {

  const [showModal, setShowModal] = useState(false)

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Eliminar
    </Tooltip>
  );

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control readOnly={true} type="text" value={props.value} />
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltipEdit}>
          <Button variant="danger" onClick={() => setShowModal(true)} ><BsFillTrashFill /></Button>
        </OverlayTrigger>
      </InputGroup>
      {showModal == true && <ModalLinkFieldMedia fieldValue={props.value} setShowModal={setShowModal} />}
    </>


  );
}