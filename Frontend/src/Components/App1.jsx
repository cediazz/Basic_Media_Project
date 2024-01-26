import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './Login/Signin'
import Sidebar from './Sidebar/Sidebar'
import { Container, Row, Col } from 'react-bootstrap'
import Media from './MediaManagement/MediaManagement'
import Plan from './PlanManagement/PlanManagement'
import Category from './CategoryManagement/CategoryManagement'
import FieldsManagement from './FieldsManagement/FieldsManagement'
import Field from './Fields/Fields'
import InsertMedia from './InsertMedia/InsertMedia'
import PlanView from './Plan/Plan'
import Alert from './Alert/Alert'
import Map from './Map/Map'
import UpdateMedia from './UpdateMedia/UpdateMedia'
import MyButtonToolbar from './MediaManagement/ButtonToolbar'
import Home from './Home/Home'



function App1() {

  
   
    return (
        <BrowserRouter>
        
          <Row>
            <Col sm={3}><Sidebar /></Col>
            <Col sm={9}>
              <Routes>
                <Route path="/Login" element={<Signin />} />
                <Route path="/" element={<Home />} />
                <Route path="/gestionar-medios" element={<Media />} />
                <Route path="/gestionar-planos" element={<Plan />} />
                <Route path="/gestionar-categoria" element={<Category />} />
                <Route path="/gestionar-campos" element={<FieldsManagement />} />
                <Route path="/insertar-medio" element={<InsertMedia />} />
                <Route path="/planos" element={<PlanView />} />
                <Route path="/button-toolbar" element={<MyButtonToolbar />} />
                <Route path="/detalles-medio" element={<UpdateMedia />} />
              </Routes>
            </Col>
          </Row>
         
       
       
      </BrowserRouter>
    )
}
export default App1