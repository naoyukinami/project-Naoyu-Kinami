import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
const db = new DatabaseSync(path.join(import.meta.dirname, './data.db'));
db.exec("PRAGMA foreign_keys = ON;");

//get all constructions
const getConstructions = () => {
    let data = db.prepare(`
        SELECT project.id, project.project_name AS title, project.comp_date AS completeDate, street.address FROM project
        JOIN street ON street.id = project.street_id
        ORDER BY project.id ASC 
            `).all();

    const output = data.map(project => ({
        id: project.id,
        title: project.title,
        completeDate: project.completeDate,
        address: project.address,

        links: {
            construction: `/api/v1/projects/${project.id}`
        }
    }));
    return output;
};

console.log(db.prepare("SELECT COUNT(*) AS c FROM project").get());


// console.log(
//     db.prepare(`
//         SELECT project.id, project.street_id, street.id AS stID
//         FROM project
//         LEFT JOIN street ON street.id = project.street_id
//     `).all()
// );


const getOneConstruction = id => {
    let data2 = db.prepare(`
        SELECT project.id, project.project_name AS title, project.comp_date AS completeDate, street.id AS streetID, street.street_name AS streetName, street.address, street.latitude, street.longitude, neighbourhood.id AS neighbourhoodID, neighbourhood.neighbourhood_name AS "neighbourhoodName" FROM project
        JOIN street ON street.id = project.street_id
        JOIN neighbourhood ON neighbourhood.id = street.neighbourhood_id
        WHERE project.id = ?
        `).get(id);
    // return(data2);

    if (!data2) {
        return null;
    }

    const output2 = {
        //project
        id: data2.id,
        title: data2.title,
        completeDate: data2.completeDate,

        //street
        street: {
            id: data2.streetID,
            name: data2.streetName,
            address: data2.address,
            latitude: data2.latitude,
            longitude: data2.longitude,
        },
        //neighburhood
        neighbourhood: {
            id: data2.neighbourhoodID,
            name: data2.neighbourhoodName
        },
        links: {
            neighbourhood: `/api/v1/neighbourhoods/${data2.neighbourhoodID}`
        }
    };
    return output2
}

//insert new project
// const insertNewProject = (title, completeDate, street_id) => {
//     let result = db.prepare(`
//         INSERT INTO project (project_name, comp_date, street_id) VALUES (
//         :title, 
//         :completeDate, 
//         :street_id
//         )
//     `).run({
//         title,
//         completeDate,
//         street_id
//     });

//     return result;
// };

//update project
const updateProject = (id, completeDate) => {
    let update = db.prepare(`
    UPDATE project SET comp_date = ? WHERE id = ?
`).run(completeDate, id);

return update;
};


const constructionModel = {
    getConstructions,
    getOneConstruction,
    // insertNewProject,
    updateProject
}

export default constructionModel;
