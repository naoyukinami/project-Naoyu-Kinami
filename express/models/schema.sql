DROP TABLE IF EXISTS update_log;
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
    neighbourhood_id    INTEGER NOT NULL REFERENCES neighbourhood(id) ON DELETE CASCADE,
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
    CASE WHEN JULIANDAY(project.comp_date) - JULIANDAY('now') <= 30
    AND JULIANDAY(project.comp_date) - JULIANDAY('now') >= 0
    THEN 1 ELSE 0
    END AS EndSoon
    FROM project
    JOIN street ON street.id = project.street_id
    JOIN neighbourhood ON neighbourhood.id = street.neighbourhood_id;

CREATE TABLE user (
    id                  INTEGER PRIMARY KEY,
    user_name           TEXT CHECK (LENGTH(user_name) > 0) NOT NULL,
    email               TEXT,
    created_at          TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE favorite (
    user_id             INTEGER,
    neighbourhood_id    INTEGER,
    created_at          TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(user_id, neighbourhood_id),
    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY(neighbourhood_id) REFERENCES neighbourhood(id) ON DELETE CASCADE
);

--INDEX--
.timer ON
SELECT neighbourhood_id, COUNT(*) AS "total"
FROM favorite
GROUP BY neighbourhood_id
HAVING "total" = (
    SELECT MAX(fav_count)
    FROM (
        SELECT COUNT(*) AS fav_count
        FROM favorite
        GROUP BY neighbourhood_id
    )
);
.timer OFF

-- This index is set up to count the most favorite area.
CREATE INDEX idx_neighbouhood_fav ON favorite(neighbourhood_id);

EXPLAIN QUERY PLAN
-- 1. count favortie for each neighbourhood
-- 2. return the highest fav
-- 3. calculate fav per neighbourhood 
SELECT neighbourhood_id, COUNT(*) AS "total"
FROM favorite
GROUP BY neighbourhood_id
HAVING "total" = (
    SELECT MAX(fav_count)
    FROM (
        SELECT COUNT(*) AS fav_count
        FROM favorite
        GROUP BY neighbourhood_id
    )
);

.timer ON
SELECT neighbourhood_id, COUNT(*) AS "total"
FROM favorite
GROUP BY neighbourhood_id
HAVING "total" = (
    SELECT MAX(fav_count)
    FROM (
        SELECT COUNT(*) AS fav_count
        FROM favorite
        GROUP BY neighbourhood_id
    )
);
.timer OFF

--TRANSACTION--
UPDATE favorite
SET neighbourhood_id = 5 WHERE user_id = 5;

UPDATE favorite
SET neighbourhood_id = 6 WHERE user_id = 6;

CREATE TABLE update_log (
    id                      INTEGER PRIMARY KEY,
    row_id                  INTEGER,
    table_name              TEXT,
    old_value               TEXT,
    new_value               TEXT
);

DROP TRIGGER IF EXISTS update_history;

CREATE TRIGGER update_history
AFTER UPDATE OF comp_date ON project
FOR EACH ROW 
BEGIN 
    INSERT INTO update_log(row_id, table_name, old_value, new_value)
    VALUES (OLD.id, 'project', OLD.comp_date, NEW.comp_date );
END;

SELECT * from update_log;