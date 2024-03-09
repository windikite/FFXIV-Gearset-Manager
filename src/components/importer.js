import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Importer({
    gearsetList,
    addGearset,
    // addGearArray,
    equipmentData,
    costData
}) {
    const [link, setLink] = useState('');
    const handleClick = async () => {
        try {
            const index = link.lastIndexOf('/');
            const id = link.slice(index+1);
            const gearset = await (await fetch(`https://etro.gg/api/gearsets/${id}`)).json();
            
            const equipment = [];
            //look up each piece of gear on the gearset
            async function findGear(id){
                const item = equipmentData.find(e => e.id === id);
                equipment.push(item);
                return item;
            }
            // console.log(gearset)
            function getStats(items){
                const totalCost = [];
                const costObj = {
                }
                items.forEach(x => {
                    function searchItem(item){
                        //attempt to find the object in the database
                        let found = costData.findIndex(i => i.name[0][0] === item);
                        if(found !== -1){
                            return costData[found];
                        }else{
                            return -1
                        }
                    }
                    function getMaterials(item){
                        //attempt to find the object in the database
                        let found = searchItem(item.name)
                        //if found, do further checking
                        if(found !== -1){
                            // console.log(`found item`, item)
                            found.materials.forEach(x => {
                                let foundMat = searchItem(x[0]);
                                if(foundMat !== -1){
                                    // console.log(`found itemMat`, x)
                                    foundMat.materials.forEach(o => {
                                        costObj[o[0]] = costObj[o[0]] ? costObj[o[0]] += o[1] : o[1]
                                    })
                                }else{
                                    // console.log(`did not find itemMat`, x)
                                    costObj[x[0]] = costObj[x[0]] ? costObj[x[0]] += x[1] : x[1]
                                }
                            })
                        }
                    }
                    getMaterials(x)
                })
                Object.entries(costObj).forEach((value) => {
                    totalCost.push(`${value[1]} ${value[0]}`)
                })
                return totalCost
                
            }
            if(equipmentData && gearset){
                const weapon = gearset.weapon ? findGear(gearset.weapon) : null;
                const head = gearset.head ? findGear(gearset.head) : null;
                const body = await gearset.body ? findGear(gearset.body) : null;
                const hands = await gearset.hands ? findGear(gearset.hands) : null;
                const legs = await gearset.legs ? findGear(gearset.legs) : null;
                const feet = await gearset.feet ? findGear(gearset.feet) : null;
                const ears = await gearset.ears ? findGear(gearset.ears) : null;
                const neck = await gearset.neck ? findGear(gearset.neck) : null;
                const wrists = await gearset.wrists ? findGear(gearset.wrists) : null;
                const fingerL = await gearset.fingerL ? findGear(gearset.fingerL) : null;
                const fingerR = await gearset.fingerR ? findGear(gearset.fingerR) : null;
                Promise.all([weapon, head, body, hands, legs, feet, ears, neck, wrists, fingerL, fingerR]).then(response => {
                    const cost = getStats(response)
                    const cleanGearset = {
                        name: `${gearset.jobAbbrev} ${gearset.name}`,
                        cost: cost,
                        gcd: gearset.totalParams.find(e => e.name === "GCD").value,
                        ilvl: gearset.totalParams.find(e => e.name === "Average Item Level").value,
                        dps: gearset.totalParams.find(e => e.name === "Damage (Expected)").value,
                    }
                    console.log(`newArray`, cleanGearset)
                    addGearset(cleanGearset)
                });
            }
            
            // //prevent duplicate set
            // const isDuplicate = gearsetList.find(o => o.id === equipmentData.id);
            // if(!isDuplicate){
            //     const types = [gearset.weapon, gearset.head];
            //     types.forEach(e => findGear(e));
            //     addGearset(gearset, equipment);
            // }
        } catch (err) {
            console.log(err.message)
        }
    }

    // function checkResponse(gearsetList) {
    //     if (gearsetList.length > 0) {
    //         return <div className='App'>Added {gearsetList[0].jobAbbrev} {gearsetList[0].name}</div>;
    //     } else {
    //         return null;
    //     }

    // }

    return ( 
        <>
            {/* manual typing */}
            <div className='input-group mb-3'>
                <input className='form-control ' type='text' placeholder='Paste Etro.gg link below' value={link} onChange={e => setLink(e.target.value)} />
                <div className='input-group-append'>
                    <button type="submit" onClick={handleClick} className='btn btn-outline-secondary '>Import</button>
                </div>
            </div>
            {/* select from preset */}
            <div className="input-group mb-3 ">
                <select className="custom-select" id="inputGroupSelect04" onChange={e => setLink(e.target.value)}>
                    <option selected>Choose...</option>
                    <option value="https://etro.gg/gearset/03eb2e94-9ab4-4c2a-88fc-3dee7802dcba">BLM</option>
                    <option value="https://etro.gg/gearset/a4c03205-c821-4f25-a153-59f40d6dbc85">AST</option>
                    <option value="https://etro.gg/gearset/5e70fc74-2509-42dc-948f-fdeecc14ae17">BRD</option>
                    <option value="https://etro.gg/gearset/a4d2d7e3-dcfe-4659-acac-5be0a8e3cb89">DRG</option>
                    <option value="https://etro.gg/gearset/fdb40071-44c4-41ec-91fa-0783d590e990">GNB</option>
                    <option value="https://etro.gg/gearset/837d0f5d-8ac7-4fc3-ba38-5ea7c3c44f50">NIN</option>
                    <option value="https://etro.gg/gearset/2d18b9db-a3ea-475a-91be-4631b0ea63d4">SGE</option>
                    <option value="https://etro.gg/gearset/9b78316a-233c-444c-8c3b-499e53678128">WAR</option>
                </select>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary rounded-3" onClick={handleClick} type="button">Import</button>
                </div>
            </div>
            {/* {checkResponse(gearsetList)} */}
        </>
        
     );
}

export default Importer;