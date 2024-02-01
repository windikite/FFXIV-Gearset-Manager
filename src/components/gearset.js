function gearset({gearset, gearArray}) {
    return ( 
        <>
            <tr className="table-striped">
                <th scope="row">{gearset.jobAbbrev} {gearset.name}</th>
                <td>{gearset.totalParams.find(e => e.name === "Average Item Level").value}</td>
                <td>{gearset.totalParams.find(e => e.name === "GCD").value}</td>
                <td>{gearset.totalParams.find(e => e.name === "CRT").value}</td>
                <td>{gearset.totalParams.find(e => e.name === "DH").value}</td>
                <td>{gearset.totalParams.find(e => e.name === "Damage (Expected)").value}</td>
                <td>{gearArray.find(e => e.slotName === "weapon").name}</td>
            </tr>
        </>
     );
}

export default gearset;