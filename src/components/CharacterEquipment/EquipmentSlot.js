import React, { useState, useEffect } from 'react';

function EquipmentSlot({
    name
}) {
    return ( 
        <div className='equipmentSlot'>
            <button type="button">{name}</button>
        </div>
     );
}

export default EquipmentSlot;