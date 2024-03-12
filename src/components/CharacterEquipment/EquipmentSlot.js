import React, { useState, useEffect } from 'react';

function EquipmentSlot({
    name,
    img
}) {
    return ( 
        <div className='equipmentSlot'>
            <input type='image' src={img}/>
        </div>
     );
}

export default EquipmentSlot;