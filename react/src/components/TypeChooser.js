import { useEffect, useState } from "react";

const TypeChooser = props => {
    const [ongoingProjects, setOngoingProject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        fetch('/api/v1/projects/construction')
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
                console.log('projects:', data.length, data);
                //returns as array
                setOngoingProject(data);
                setLoading(false);
                setSuccessMessage("Load success");
            })
            .catch(error => {
                console.log(error)
                setError(error);
                setLoading(false);
            });

    },
        []); // empty array to call function on load

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "#F28C28" }}>Error: {error.message}</p>;

    return (<>
        {successMessage}
        {/* <ul>
            {ongoingProjects.map(project => (
                <li
                    key={project.id} onClick={() => props.setChosen(project.id)}>
                    {project.title}
                </li>
            ))}
        </ul> */}
        <h2>Review of constructions:</h2>
        <form onSubmit={(event) => event.preventDefault()}>
            {/* <label htmlFor="type">Review of constructions:</label> */}
            <select
                id="type"
                value={props.chosen}
                onChange={(e) => props.setChosen(e.target.value)}
            >

                <option value="" disabled>Select a construction</option>
                {ongoingProjects.map(project => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                ))}
            </select>
        </form>
    </>)
}

export default TypeChooser;