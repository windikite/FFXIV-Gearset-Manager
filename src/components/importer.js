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
            console.log(gearset)
            function parseSet(items){
                const totalCost = [];
                const costObj = {
                }
                const setClean = [];
                items.forEach(x => {
                    console.log(x)
                    let cleanItem = {
                        name: x.name,
                        type: x.slotName,
                        img_path: '',
                        submats: []
                    }
                    function searchItem(itemName){
                        //attempt to find the object in the database
                        let foundIndex = costData.findIndex(i => i.name?.[0]?.[0] === itemName);
                        if(foundIndex !== -1){
                            return costData[foundIndex];
                        }else{
                            return -1
                        }
                    }
                    function getMaterials(item){
                        //attempt to find the object in the database
                        console.log("name", item)
                        let found = searchItem(item.name)
                        console.log("found", found)
                        console.log("found name", found.name[0][1])
                        if(found){
                            let img_url = found.name[0][1]
                            let last_slash = img_url.lastIndexOf('/');
                            let first_cut = img_url.slice(last_slash+1)
                            let dot = first_cut.indexOf('.');
                            cleanItem.img_path = `./resources/ff14assets/${first_cut.slice(0, dot)}.png`
                        }
                        //if found, do further checking
                        if(found !== -1){
                            // console.log(`found item`, item)
                            found.materials.forEach(x => {
                                //check if item can be broken down further
                                let foundMat = searchItem(x[0]);
                                if(foundMat !== -1){
                                    let submat = [foundMat.name[0], foundMat.name[1]]
                                    cleanItem.submats.push(submat)
                                    // item can be broken down further
                                    foundMat.materials.forEach(o => {
                                        costObj[o[0]] = costObj[o[0]] ? costObj[o[0]] += o[2] : o[2]
                                    })
                                }else{
                                    // item is a currency or token and cannot be broken down any further
                                    costObj[x[0]] = costObj[x[0]] ? costObj[x[0]] += x[2] : x[2];
                                }
                            })
                        }
                    }
                    getMaterials(x)
                    setClean.push(cleanItem)
                })
                Object.entries(costObj).forEach((value) => {
                    totalCost.push(`${value[1]} ${value[0]}`)
                })
                let data = {};
                data['setClean'] = setClean;
                data['totalCost'] = totalCost;
                return data
                
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
                    const parsedSet = parseSet(response)
                    const cleanGearset = {
                        name: `${gearset.jobAbbrev} ${gearset.name}`,
                        cost: parsedSet.totalCost,
                        pieces: parsedSet.setClean,
                        gcd: gearset.totalParams.find(e => e.name === "GCD").value,
                        ilvl: gearset.totalParams.find(e => e.name === "Average Item Level").value,
                        dps: gearset.totalParams.find(e => e.name === "100p Action (Expected)").value,
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
                    <option value="https://etro.gg/gearset/aafd1811-be2a-4252-a9f7-27ee29699d4e">BLM</option>
                    {/* <option value="https://etro.gg/gearset/a4c03205-c821-4f25-a153-59f40d6dbc85">AST</option>
                    <option value="https://etro.gg/gearset/5e70fc74-2509-42dc-948f-fdeecc14ae17">BRD</option>
                    <option value="https://etro.gg/gearset/a4d2d7e3-dcfe-4659-acac-5be0a8e3cb89">DRG</option>
                    <option value="https://etro.gg/gearset/fdb40071-44c4-41ec-91fa-0783d590e990">GNB</option>
                    <option value="https://etro.gg/gearset/837d0f5d-8ac7-4fc3-ba38-5ea7c3c44f50">NIN</option>
                    <option value="https://etro.gg/gearset/2d18b9db-a3ea-475a-91be-4631b0ea63d4">SGE</option> */}
                    <option value="https://etro.gg/gearset/e849b479-d7eb-46dc-b801-b0c4d7a60881">WAR</option>
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