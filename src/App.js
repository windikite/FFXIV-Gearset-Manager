import React, { useState, useEffect } from 'react';
import Importer from './components/importer';
import GearsetList from './components/gearsetList';
import Header from './components/header';
import Navbar from './components/navbar';
// import Head from './components/head';
import './App.css';
import Container from 'react-bootstrap/Container';
import Spinner from './components/Spinner/Spinner';
import axios from 'axios';
import Collection from './components/collection';
let costData = require('./resources/ff14gear.json');

function App() {
  const [gearsetList, setGearsets] = useState([]);
  const [gearArray, setGearArray] = useState([]);
  const [equipmentData, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const result = await axios('https://etro.gg/api/equipment/?minLevel=90');
          setData(result.data);
      };
      fetchData();
  }, [])

  function addGearset(gearset){
    let updatedGearsets = [...gearsetList, gearset];
    // let updatedGearArray = [...gearArray, equipment];
    setGearsets(updatedGearsets);
    // setGearArray(updatedGearArray);
    // console.log(equipment)
  }

  function addGearsetToCollection(gear){
    let updatedGearArray = [...gearArray, gear];
    setGearArray(updatedGearArray);
  }

  function removeGearsetFromCollection(gear){
    let found = gearArray.findIndex(e => e.name === gear.name);
    let updatedGearArray = gearArray.splice(found, 1);
    setGearArray(updatedGearArray);
  }

  return (
    <Container className='p-3 border-primary-subtle'>
      <Header />
      {/* <Navbar /> */}
      <Container >
        {equipmentData.length > 0 ? 
          <Importer 
          gearsetList={gearsetList} 
          addGearset={addGearset} 
          equipmentData={equipmentData}
          costData={costData}
          />
        : <Spinner />}
      </Container>
      <h2>Import sets above, then add the imported sets to your collection using the "+" buttons</h2>
      <Container >
        <h1>
          Imported Sets
        </h1>
        <Collection
          gearArray={gearsetList}
          collectionName="Sets"
          setGearArray={addGearsetToCollection}
        />
      </Container>
      
      <Container >
        <h1>Selected Sets</h1>
        <Collection
          gearArray={gearArray}
          collectionName={"Sets"}
          setGearArray={removeGearsetFromCollection}
        />
      </Container>
        
    </Container>
  );
}

export default App;
