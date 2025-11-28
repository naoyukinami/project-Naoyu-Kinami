import { useEffect, useState } from "react";

const TypeNeighbourhood = props => {
    const [area, setArea] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        //get all neighbourhood
        fetch('/api/v1/projects/neighbourhood')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || "Failed to post");
                    });
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log('neighbourhood projects:', data);
                setArea(data);
                setLoading(false);
                setSuccessMessage("Load success");
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setLoading(false);
            })
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "#F28C28" }}>Error: {error.message}</p>;

    return (
        <>
        {successMessage}

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