import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import axios from 'axios';

function Importer({
    gearsetList,
    addGearset,
    addGearArray
}) {
    const [link, setLink] = useState('');
    // const [setUrl, data, loading, setLoading] = useAxios();
    // useEffect(() => {
    //     setUrl('https://etro.gg/api/equipment/');
    //     setLoading(true);
    // }, [])
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://etro.gg/api/equipment/');
            setData(result.data);
        };
        fetchData();
    }, [])

    const handleClick = async () => {
        try {
            const index = link.lastIndexOf('/');
            const id = link.slice(index+1);
            const gearset = await (await fetch(`https://etro.gg/api/gearsets/${id}`)).json();
            
            const equipment = [];
            //look up each piece of gear on the gearset
            async function findGear(id){
                const item = data.find(e => e.id === id);
                equipment.push(item);
                return item;
            }
            
            if(data && gearset){
                const weapon = gearset.weapon ? findGear(gearset.weapon) : null;
                const head = gearset.head ? findGear(gearset.head) : null;
                const body = await gearset.body ? findGear(gearset.body) : null;
                const hands = await gearset.hands ? findGear(gearset.hands) : null;
                const legs = await gearset.legs ? findGear(gearset.legs) : null;
                const feet = await gearset.feet ? findGear(gearset.feet) : null;
                Promise.all([weapon, head, body, hands, legs, feet]).then(response => addGearArray(response));
                console.log(equipment);
            }
            
            

            //prevent duplicate set
            const isDuplicate = gearsetList.find(o => o.id === data.id);
            if(!isDuplicate){
                const types = [gearset.weapon, gearset.head];
                types.forEach(e => findGear(e));
                addGearset(gearset, equipment);
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    function checkResponse(gearsetList) {
        if (gearsetList.length > 0) {
            return <div className='App'>Added {gearsetList[0].jobAbbrev} {gearsetList[0].name}</div>;
        } else {
            return null;
        }

    }

    return ( 
        <>
            {/* manual typing */}
            <div className='input-group mb-3'>
                <input className='form-control' type='text' placeholder='Paste Etro.gg link below' value={link} onChange={e => setLink(e.target.value)} />
                <div className='input-group-append'>
                    <button type="submit" onClick={handleClick} className='btn btn-outline-secondary'>Import</button>
                </div>
            </div>
            {/* select from preset */}
            <div className="input-group mb-3">
                <select className="custom-select" id="inputGroupSelect04" onChange={e => setLink(e.target.value)}>
                    <option selected>Choose...</option>
                    <option value="https://etro.gg/gearset/03eb2e94-9ab4-4c2a-88fc-3dee7802dcba">BLM</option>
                    <option value="https://etro.gg/gearset/a4c03205-c821-4f25-a153-59f40d6dbc85">AST</option>
                    <option value="https://etro.gg/gearset/5e70fc74-2509-42dc-948f-fdeecc14ae17">BRD</option>
                </select>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={handleClick} type="button">Import</button>
                </div>
            </div>
            {checkResponse(gearsetList)}
        </>
        
     );
}

export default Importer;