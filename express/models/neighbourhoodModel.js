import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
const db = new DatabaseSync(path.join(import.meta.dirname, './data.db'));
db.exec("PRAGMA foreign_keys = ON;");


const getNeighbourhoods = () => {
    let data3 = db.prepare(`
        SELECT neighbourhood.id, neighbourhood.neighbourhood_name AS neighbourhoodName 
        FROM neighbourhood
        `).all();

    const output3 = data3.map(neighbourhood => ({
        id: neighbourhood.id,
        name: neighbourhood.neighbourhoodName,
        links: {
            neighbourhood: `/api/neighbourhoods/${neighbourhood.id}`
        }
    }));
    return output3
}


const getByNeighbourhood = ({ neighbourhoodName, page }) => {
    const limit = 3;
    const offset = (page - 1) * limit;

    let data4 = db.prepare(`
        SELECT project.id, project.project_name AS title, project.comp_date AS completeDate, street.neighbourhood_id AS neighbourhoodID, neighbourhood.neighbourhood_name AS neighbourhoodName FROM project
        JOIN street ON street.id = project.street_id
        JOIN neighbourhood ON neighbourhood.id = street.neighbourhood_id
        WHERE neighbourhood.neighbourhood_name = ?
        LIMIT ? OFFSET ?
        `).all(neighbourhoodName, limit, offset);

    const output4 = data4.map(project => ({
        id: project.id,
        title: project.title,
        completeDate: project.completeDate,
        neighbourhood: project.neighbourhoodName,

        links: {
            construction: `/api/v1/projects/${project.id}`
        }
    }));
    return output4;
}

const countConstructionByNeighbourhood = () => {
    let data5 = db.prepare(`
        SELECT street.neighbourhood_id AS neighbourhoodID, neighbourhood.neighbourhood_name AS neighbourhoodName, COUNT(*) AS "NumberOfConstruction" FROM project
        JOIN street ON street.id = project.street_id
        JOIN neighbourhood ON neighbourhood.id = street.neighbourhood_id
        GROUP BY neighbourhood.id
        `).all()

    const output5 = data5.map(row => ({
        id: row.neighbourhoodID,
        neighbourhood: row.neighbourhoodName,
        total: row.NumberOfConstruction
    }));
    return output5;
}

const neighbourhoodModel = { getNeighbourhoods, getByNeighbourhood, countConstructionByNeighbourhood }

export default neighbourhoodModel;