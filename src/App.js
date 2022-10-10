import { useEffect } from 'react'
import { connect } from 'react-redux'
import * as action from './redux/action'
import Table from '../src/components/table'
import './App.scss'
import Navbar from './components/navbar'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Footer from './components/footer'

function App(props) {
  useEffect(() => {
    props.getFish()
  });

  const { fishData, addFish } = props

  return (
    <div className="App">
      <Navbar />
      <Container>
        <div className="max-w-screen-xl mx-auto py-40">
          <div className="shadow-md p-0">
            <div className="flex flex-col">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table
                  data={fishData}
                  addFishData={addFish}
                />
              </div>
            </div>
          </div>
        </div>
      </Container >
      <Footer />
    </div >
  );
}

const mapStateToProps = state => ({
  fishData: state.fishData
})

export default connect(mapStateToProps, action)(App);
