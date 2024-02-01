import Gearset from "./gearset";
import Container from "react-bootstrap/esm/Container";

function gearsetList({gearsetList, gearArray}) {
    function checkGearsetList(gearsetList){
        if(gearsetList.length > 0){
            return(
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr className="table table-striped" >
                                <th scope="col">Set Name</th>
                                <th scope="col">ILvl</th>
                                <th scope="col">GCD</th>
                                <th scope="col">Crit</th>
                                <th scope="col">DHit</th>
                                <th scope="col">Expected DPS</th>
                                <th scope="col">Weapon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gearsetList.map((gearset, index) => <Gearset key={gearset.id} gearset={gearsetList[index]} gearArray={gearArray[index]} />)}
                        </tbody>
                    </table>
                </>
                
            )
            
        }else{
            // console.log(`gearset not found by list yet :<`)
            return(
                <h1>Import a gearset above!</h1>
            )
        }
    }
    return(
        <Container>
            {checkGearsetList(gearsetList)}
        </Container>
    )
}

export default gearsetList;