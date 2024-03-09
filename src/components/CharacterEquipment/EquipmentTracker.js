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

    function checkOptions(){
        return <select onChange={(e) => changeGearset(character, e.target.value)}>
            <option value={null}>---</option>
            {gearsetList.map((x) => {
                return <option value={x.name} key={x.name}>{x.name}</option>
            })}
        </select>
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
                        <EquipmentSlot 
                            name={'Weapon'}
                        />
                        <EquipmentSlot 
                            name={'Head'}
                        />
                        <EquipmentSlot 
                            name={'Chest'}
                        />
                        <EquipmentSlot 
                            name={'Gloves'}
                        />
                        <EquipmentSlot 
                            name={'Pants'}
                        />
                        <EquipmentSlot 
                            name={'Boots'}
                        />
                    </div>
                    <div className='rightSide'>
                        <EquipmentSlot 
                            name={'Earring'}
                        />
                        <EquipmentSlot 
                            name={'Neck'}
                        />
                        <EquipmentSlot 
                            name={'Wrist'}
                        />
                        <EquipmentSlot 
                            name={'RingL'}
                        />
                        <EquipmentSlot 
                            name={'RingR'}
                        />
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}

export default EquipmentTracker;