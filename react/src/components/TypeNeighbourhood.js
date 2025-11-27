import { useEffect, useState } from "react";

const TypeNeighbourhood = props => {
    const [area, setArea] = useState([]);

    useEffect(() => {
        //get all neighbourhood
        fetch('/api/v1/projects/neighbourhood')
        .then(response => response.json())
        .then(data => {
                console.log('neighbourhood projects:', data);
                setArea(data);
            })
            .catch(error => console.log(error))
    }, []);
    return(
        <>
        <h2>Review of constructions by neighbourhood:</h2>
        <form onSubmit={(event) => event.preventDefault()}>
            <select
                id="type"
                value={props.chosen2}
                onChange={(e) => props.setChosen2(e.target.value)}
            >
                <option value="" disabled>Select a neighbourhood</option>
                {area.map(neighbourhood => (
                    <option key={neighbourhood.id} value={neighbourhood.name}>{neighbourhood.name}</option>
                ))}
            </select>
        </form>
        </>
    )
}

export default TypeNeighbourhood;