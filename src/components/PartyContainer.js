import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import EquipmentTracker from './CharacterEquipment/EquipmentTracker';

function PartyContainer({
    gearsetList
}) {
    const [partyList, setPartyList] = useState([]);

    function addPartyMember(){
        const generateKey = (pre) => {
            return `${ pre }_${ new Date().getTime() }`;
        }
        let partyMember = {
            id: generateKey(partyList.length),
            name: '',
            gearset: null,
        }
        let newParty = [...partyList, partyMember]
        setPartyList(newParty)
        console.log(partyList)
    }

    function changeName(partyMember, newName){
        let oldParty = [...partyList];
        let found = oldParty.findIndex(x => x.id == partyMember.id);
        oldParty[found].name = newName;
        setPartyList(oldParty);
    }

    function changeGearset(partyMember, set){
        let oldParty = [...partyList];
        let found = oldParty.findIndex(x => x.id == partyMember.id);
        let foundSet = gearsetList.findIndex(x => x.name == set)
        oldParty[found].gearset = gearsetList[foundSet];
        setPartyList(oldParty);
    }

    function checkParty(){
        return (
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {partyList.map((x) => 
                        <EquipmentTracker 
                        gearsetList={gearsetList}
                        changeGearset={changeGearset}
                        changeName={changeName}
                        character={x}
                        key={x.id}
                        />
                    )}
            </div>
        )
    }

    return ( 
        <Container className='mt-3 mb-3 p-3 bg-dark-subtle border border-dark-subtle rounded-3'>
            <h1>Raid Members</h1>
            <button type='button' onClick={() => addPartyMember()}>Add Party Member</button>
            {checkParty()}
            
        </Container>
     );
}

export default PartyContainer;