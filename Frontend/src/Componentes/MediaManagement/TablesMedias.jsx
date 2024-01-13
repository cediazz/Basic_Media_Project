import Table from 'react-bootstrap/Table';
import MyButtonToolbar from './ButtonToolbar';

function TableMedias(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Localización</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
       {props.data.map( (media) => 
       <tr>
        <td>{media.category.description}</td>
        <td>{media.plan.description}</td>
        <td>{media.description}</td>
        <MyButtonToolbar 
        mediaID={media.id} 
        mediaDescription={media.description}
        categoryID={media.category.id} 
        categoryDescription={media.category.description}
        planID={media.plan.id}
        planDescription={media.plan.description}
        planImage={media.plan.image}
        coordinadas={{lat:media.coordinadas.lat,lng:media.coordinadas.lng}}
        deleteMedia={props.deleteMedia} 
        />
        <td></td></tr> )}
      </tbody>
    </Table>
  );
}

export default TableMedias;