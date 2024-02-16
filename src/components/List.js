import Container from "react-bootstrap/esm/Container";
import Item from "./Item";

function List({
    list,
    name,
    h1,
    h2,
    h3,
    h4,
    h5,
    c1,
    c2,
    c3,
    c4,
    c5,
    setSelectedData
}) {
    const name1 = name ? <th scope="col">{name}</th> : null;
    const header1 = h1 ? <th scope="col">{h1}</th> : null;
    const header2 = h2 ? <th scope="col">{h2}</th> : null;
    const header3 = h3 ? <th scope="col">{h3}</th> : null;
    const header4 = h4 ? <th scope="col">{h4}</th> : null;
    const header5 = h5 ? <th scope="col">{h5}</th> : null;



    function checkList(list){
        if(list.length > 0){
            return(
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr className="table table-striped" >
                                {name1}
                                {header1}
                                {header2}
                                {header3}
                                {header4}
                                {header5}
                                
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => <Item 
                                key={item.id} 
                                item={list[index]} 
                                c1={c1}
                                c2={c2}
                                c3={c3}
                                c4={c4}
                                c5={c5}
                                setSelectedData={setSelectedData}
                                />)}
                                
                        </tbody>
                    </table>
                </>
                
            )
            
        }else{
            return(
                <h1>loading...</h1>
            )
        }
    }
    return(
        <Container>
            {checkList(list)}
        </Container>
    )
}

export default List;