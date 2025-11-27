DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS street;
DROP TABLE IF EXISTS neighbourhood;
DROP TABLE IF EXISTS user;

CREATE TABLE neighbourhood (
    id                  INTEGER PRIMARY KEY,
    neighbourhood_name  TEXT NOT NULL
);

CREATE TABLE street (
    id                  INTEGER PRIMARY KEY,
    street_name         TEXT NOT NULL,
    neighbourhood_id    INTEGER NOT NULL REFERENCES neighbourhood(id),
    address             TEXT,
    latitude            REAL,
    longitude           REAL
);

CREATE TABLE project (
    id                  INTEGER PRIMARY KEY,
    project_name        TEXT NOT NULL,
    comp_date           TEXT,
    street_id           INTEGER NOT NULL REFERENCES street(id)
);

DROP VIEW IF EXISTS almost_complete_project;

CREATE VIEW almost_complete_project AS
    SELECT project.id, project.project_name, street.street_name, project.comp_date, neighbourhood.neighbourhood_name,
    CASE WHEN WHEN JULIANDAY(DATE('now')) - JULIANDAY(comp_date) <= 30 
    END AS 

CREATE TABLE user (
    id                  INTEGER PRIMARY KEY,
    user_name           TEXT CHECK (LENGTH(user_name) > 0) NOT NULL,
    email               TEXT,
    created_at          TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE favorite (
    user_id             INTEGER AUTO_INCREMENT,
    neighbourhood_id    INTEGER,
    created_at          TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(user_id, neighbourhood_id),
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(neighbourhood_id) REFERENCES neighbourhood(id)
);
