import React, { useState, useEffect } from 'react';
import List from './List';

function collection({
    gearArray,
    setGearArray,
    collectionName
}) {
    
    return ( 
        <List
                    list={gearArray}
                    name={collectionName}
                    h1=""
                    h2="ILvl"
                    h3="GCD"  
                    h4="Expected DPS"
                    h5="Cost"
                    c1=""
                    c2="ilvl"
                    c3="gcd"
                    c4="dps"
                    c5="cost"
                    setSelectedData={setGearArray}
                />
     );
}

export default collection;