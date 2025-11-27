import { useEffect, useState } from "react";

const TypeChooser = props => {
    const [ongoingProjects, setOngoingProject] = useState([]);

    useEffect(() => {
        fetch('/api/v1/projects/construction')
            .then(response => response.json())
            .then(data => {
                console.log('projects:', data.length, data);
                //returns as array
                setOngoingProject(data);
            })
            .catch(error => console.log(error))
    },
        []); // empty array to call function on load
    return (<>
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