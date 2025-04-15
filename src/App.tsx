
import './App.css'
import {Container, Row, Col} from 'react-bootstrap'
import Cards from './component/Cards'

function App() {
  

  return (
    <>
     <Container>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
        <Cards />
        </Col>
      </Row>
     </Container>
    </>
  )
}

export default App
