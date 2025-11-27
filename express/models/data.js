//importing data from Vancouver Open Data
import VancouverConstruction from './construction.json' with { type: 'json' };

//functions and methods interacting with SQL db
import { DatabaseSync } from 'node:sqlite';
//path, set up
import path from 'node:path';

//creating actual db
const db = new DatabaseSync(path.join(import.meta.dirname, '/data.db'));
db.exec('PRAGMA foreign_keys = ON;');


// Delete all data from the database
db.prepare('DELETE FROM user;').run();
db.prepare('DELETE FROM project;').run();
db.prepare('DELETE FROM neighbourhood;').run();
db.prepare('DELETE FROM favorite;').run();
db.prepare('DELETE FROM street;').run();

console.log(VancouverConstruction);

VancouverConstruction.forEach(project => {
    console.log(project.project, project.street, project.location, project.comp_date);
    //there are no "neighbourhood" and "street_name" in the data, so make these first to connect.
    //how to get neighbourhood? -> using lat and lon
    //how to extract street name? -> using location

    //get neighbourhood area
    const getNeighbourhood = (lat, lon) => {
        if(lat > 49.28 && lon > -123.14) return "Downtown";
        if(lat > 49.28 && lon > -123.13) return "West End";

        if(lat > 49.27 && lon > -123.08) return "Strathcona";
        if(lat > 49.27 && lon > -123.07) return "Grandview-Woodland";
        if(lat > 49.27 && lon > -123.05) return "Hastings-Sunrise";

        if(lat > 49.26 && lon > -123.16) return "Kitsilano";
        if(lat > 49.26 && lon > -123.13) return "Fairview";

        if(lat > 49.25 && lon > -123.10) return "Mount Pleasant";

        if(lat > 49.24 && lon > -123.16) return "Arbutus-Ridge";
        if(lat > 49.24 && lon > -123.14) return "Shaughnessy";
        if(lat > 49.24 && lon > -123.11) return "South Cambie";
        if(lat > 49.24 && lon > -123.10) return "Riley Park";
        if(lat > 49.24 && lon > -123.06) return "Kensington-Cedar Cottage"; 

        if(lat > 49.23 && lon > -123.18) return "Dunbar-Southlands";
        if(lat > 49.23 && lon > -123.15) return "Kerrisdale";
        if(lat > 49.23 && lon > -123.11) return "Oakridge";
        if(lat > 49.23 && lon > -123.03) return "Renfrew-Collingwood";
        if(lat > 49.23 && lon > -123.03) return "Killarney";

        if(lat > 49.22 && lon > -123.10) return "Sunset";

        if(lat > 49.21 && lon > -123.13) return "Marpole";
        if(lat > 49.21 && lon > -123.06) return "Victoria-Fraserview";

        if(lat > 49.27 && lon > -123.19) return "West Point Grey";

        return "Unknown";
    };

    const lat = project.geo_point_2d.lat;
    const lon = project.geo_point_2d.lon;

    //generate neighbourhood_name
    const neighbourhoodName = getNeighbourhood(lat, lon);

    //get neighbourhood_id
    const getNeighbourhoodId = ((neighbourhoodName) => {
        const checkNeighbourhood = db.prepare(`
            SELECT id FROM neighbourhood WHERE neighbourhood_name = ?;
            `).get(neighbourhoodName);

        if (checkNeighbourhood) {
            return checkNeighbourhood.id;
        }

        const insertNeighbourhoodId = db.prepare(`
            INSERT INTO neighbourhood (neighbourhood_name
            ) VALUES (
            ?
            );
            `).run(
            neighbourhoodName || null,
        );
        return insertNeighbourhoodId.lastInsertRowid;
    });

    const neighbourhoodId = getNeighbourhoodId(neighbourhoodName);

    //since no "street_name" in the data, so make it using location
    const generateStreetName = ((location) => {
        if (!location)
            return "undefined street";
        return location.split(" - ")[0]; //return as STRING, not array
    });

    let streetName;
    if(project.street) {
        streetName = project.street;
    } else {
        streetName = generateStreetName(project.location);
    }



    let matchingStreets = db.prepare(`
        SELECT * FROM street WHERE
        "street_name" = ? AND
        "neighbourhood_id" = ? AND
        "address" = ?;
        `)
        //↑checking if there is a row that matches the data for particular street
        .all(
            streetName || null,
            neighbourhoodId || null,
            project.location || null
        );


    let streetResult;

    if (matchingStreets.length != 0) {
        streetResult = {
            lastInsertRowid: matchingStreets[0].id
        }
    }
    else {
        streetResult = db.prepare(`
            INSERT INTO street (
                street_name,
                neighbourhood_id,
                address,
                latitude,
                longitude
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?
            );
            `).run(
            streetName || null,
            neighbourhoodId || null,
            project.location || null,
            project.geo_point_2d.lat || null,
            project.geo_point_2d.lon || null
        );
    }

    //since there are some "project: null" in the data, so if project is set null, give it to "untitled"
    const projectName = project.project ?? "untitled";

    // project works:
    db.prepare(`
        INSERT INTO project (
            project_name,
            comp_date,
            street_id
        ) VALUES (
            ?,
            ?,
            ? 
        );
    `).run(
        projectName,
        project.comp_date,
        // This comes from the project location we either inserted just now or found (already exists)
        streetResult.lastInsertRowid,
    );
});

//drop the address later maybe?

