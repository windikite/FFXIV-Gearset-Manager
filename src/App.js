import React, { useState, useEffect } from 'react';
import Importer from './components/importer';
import GearsetList from './components/gearsetList';
import Header from './components/header';
import Navbar from './components/navbar';
// import Head from './components/head';
import './App.css';
import Container from 'react-bootstrap/Container';

function App() {
  const [gearsetList, setGearsets] = useState([]);
  const [gearArray, setGearArray] = useState([]);

  function addGearset(gearset){
    let updatedGearsets = [...gearsetList, gearset];
    // let updatedGearArray = [...gearArray, equipment];
    setGearsets(updatedGearsets);
    // setGearArray(updatedGearArray);
    // console.log(equipment)
  }

  function addGearArray(gear){
    let updatedGearArray = [...gearArray, gear];
    setGearArray(updatedGearArray);
  }

  return (
    <Container className='p-3 border-primary-subtle'>
      <Header />
      {/* <Navbar /> */}
      <Importer gearsetList={gearsetList} addGearset={addGearset} addGearArray={addGearArray} />
      <GearsetList gearsetList={gearsetList} gearArray={gearArray} />
    </Container>
  );
}

export default App;
