import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom';
import ModalDeleteMedia from "../Modal/ModalDeleteMedia";

function MyButtonToolbar(props) {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Eliminar
    </Tooltip>
  );

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Detalle
    </Tooltip>
  );

  console.log(props.mediaDescription)


  return (
    <>
    <ButtonToolbar aria-label="Toolbar with button groups">
      <ButtonGroup className="me-2" aria-label="First group">
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltipEdit}>
          <Button variant='primary' onClick={() => navigate(
            '/detalles-medio',
            {
              state: {
                description: props.mediaDescription,
                id: props.mediaID,
                catID: props.categoryID,
                catDescription: props.categoryDescription,
                planID: props.planID,
                planDescription: props.planDescription,
                planImage: props.planImage,
                coordinadas: props.coordinadas
              }
            })} >
            <BsPencilSquare />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
      <ButtonGroup className="me-2" aria-label="Second group">
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltipDelete}>
          <Button variant='danger' onClick={() => setShowModal(true)}><BsFillTrashFill /></Button>
        </OverlayTrigger>
      </ButtonGroup>
    </ButtonToolbar>
  {showModal == true && <ModalDeleteMedia deleteMedia={props.deleteMedia} mediaID={props.mediaID} setShowModal={setShowModal} />}
  </>

  );
}

export default MyButtonToolbar;