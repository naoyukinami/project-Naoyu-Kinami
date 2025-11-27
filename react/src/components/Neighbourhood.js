import { useEffect, useState } from "react";

const Neighbourhood = props => {
    const [areaConstruction, setAreaConstruction] = useState([]);
    const [load, setLoad] = useState(false);
    // const [reload, setReload] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!props.chosen2) return;

        setLoad(true);

        fetch(`/api/v1/projects/neighbourhood/${props.chosen2}?page=${page}`)
            .then(response => response.json())
            .then(areaResponse => {
                setAreaConstruction(areaResponse);
                // setPage(0);
                setLoad(false);
            })
            .catch(err => console.log(err));
        setLoad(false);
    }, [props.chosen2, page]);

    // const handleButton = () => {
    //     setReload(!reload);
    // };

    const next = () => {
        setPage((prev) => prev + 1);
    };

    const prev = () => {
        setPage (prev => Math.max(prev - 1, 1));
    };

    // http://localhost:3005/api/v1/projects/neighbourhood/Kitsilano
    //return as ARRAY


    {/* {areaConstruction ? (
                <>
                    <h3><strong>{props.chosen} Area Construction Detail</strong></h3>
                    <p><strong>Title:</strong> {areaConstruction.title}</p>
                    <p><strong>Complete Date:</strong> {areaConstruction.completeDate}</p>
                </>
            ) : (
                <p>Not selected a neighbourhood yet.</p>
            )
            } */}
    // {areaConstruction.map((areaCon) => {
    //         return (
    //             <>
    //                 <h3><strong>{props.chosen} Area Construction Detail</strong></h3>

    //                 {load ? (
    //                     <p>Not selected a neighbourhood yet.</p>
    //                 ) : props.chosen &&
    //                 <>
    //                     <ul>
    //                         <li><strong>Title:</strong> {areaCon.title}</li>
    //                         <li><strong>Complete Date:</strong> {areaCon.completeDate}</li>
    //                     </ul>

    //                 </>}
    //                 <button onClick={handleButton}>
    //                     Get another construction
    //                 </button>
    //             </>
    //         )
    //     })
    // }
    return (
        <>
            {props.chosen2 && (
                <h4>{props.chosen2} Area Construction Detail</h4>
            )}

            {load ? (
                <p>Not selected a neighbourhood yet.</p>
            ) : (
                <>
                    <ul>
                        {areaConstruction.map((areaCon) => (
                            <li key={areaCon.id}>
                                <strong>ID: </strong> {areaCon.id}
                                <br />
                                <strong>Title: </strong> {areaCon.title}
                                <br />
                                <strong>Complete Date: </strong> {areaCon.completeDate}
                            </li>
                        ))}
                    </ul>

                    {/* <button onClick={handleButton}>
                        Next
                    </button> */}

                    {props.chosen2 && (
                    <div class="button">
                        <button onClick={prev} style={{marginRight: "1rem"}}>
                            Prev
                        </button>
                        <button onClick={next}>
                            Next
                        </button>
                    </div>
                    )}
                </>
            )}
        </>
    )

}

export default Neighbourhood;