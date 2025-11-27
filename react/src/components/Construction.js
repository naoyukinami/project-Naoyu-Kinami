import { useEffect, useState } from "react";

const Construction = props => {
    const [construction, setConstruction] = useState(null);
    // const [ detail, setDetail ] = useState();

    useEffect(() => {
        if (props.chosen) {
            fetch(`/api/v1/projects/construction/${props.chosen}`)
                .then(response => response.json())
                .then(data => {
                    console.log("detail:", data);
                    setConstruction(data)
                })
                .catch(err => console.log(err));
        }
    }, [props.chosen]);

    // http://localhost:3005/api/v1/projects/construction
    //returns an OBJECT
    return (
        <div>
            {/* 
        condition ? (true) 
                  : (false) 
        */}
            {construction ? (
                <>
                    <h4>Construction Detail</h4>
                    <p><strong>Title:</strong> {construction.title}</p>
                    <p><strong>Complete Date:</strong> {construction.completeDate}</p>
                    <p><strong>Address:</strong> {construction.street.address}</p>
                    <p><strong>Neighbourhood:</strong> {construction.neighbourhood?.name}</p>
                </>
            ) : (
                <p>Not selected a construction yet.</p>
            )}
        </div>
    )
}



export default Construction;