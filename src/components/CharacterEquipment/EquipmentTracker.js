import React, { useState, useEffect } from 'react';
import EquipmentSlot from './EquipmentSlot';
import "./Equipment.css";

function EquipmentTracker({
    gearsetList,
    character,
    changeGearset,
    changeName
}) {
    let gearSetCost = character.gearset ? (character.gearset.cost ? character.gearset.cost.map(x => <li>{x}</li>) : '') : '';

    const leftSide = ['weapon', 'body', 'hands', 'legs', 'feet'];
    const rightSide = ['ears', 'neck', 'wrists', 'finger', 'finger'];

    function checkOptions(){
        return <select onChange={(e) => changeGearset(character, e.target.value)}>
            <option value={null}>---</option>
            {gearsetList.map((x) => {
                return <option value={x.name} key={x.name}>{x.name}</option>
            })}
        </select>
    }

    function checkImg(slot){
        let img_path = './ff14assets/hS0hxezTqDeid-w7F6z01MvS5E.png';
        if(character.gearset){
            let piece = character.gearset.pieces.find(x => x.type == slot);
            if(piece){
                img_path = piece.img_path ? piece.img_path : './ff14assets/hS0hxezTqDeid-w7F6z01MvS5E.png';
            }
        }
        
        return img_path
    }
    return ( 
        <div className='characterBox bg-secondary border border-dark-subtle rounded-3'>
            <div className="input-group mt-1">
                <input 
                    type="text" 
                    aria-label="Name" 
                    className="form-control" 
                    placeholder='Name'
                    onChange={e => changeName(character, e.target.value)}
                />
            </div>
            {checkOptions()}
            <div style={{display:'flex'}}>
                <div className='equipmentInfo bg-dark border border-dark-subtle rounded-3 bg-opacity-75'>
                    <ul>{gearSetCost}</ul>
                </div>
                <div className='equipmentBox bg-dark border border-dark-subtle rounded-3 bg-opacity-75'>
                    <div className='leftSide'>
                        {leftSide.map(x => 
                            <EquipmentSlot 
                                img={checkImg(x)}
                            />)
                        }
                    </div>
                    <div className='rightSide'>
                        {rightSide.map(x => 
                            <EquipmentSlot 
                                img={checkImg(x)}
                            />)
                        }
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}

export default EquipmentTracker;