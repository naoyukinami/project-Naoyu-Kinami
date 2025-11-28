import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
const db = new DatabaseSync(path.join(import.meta.dirname, './data.db'));
db.exec("PRAGMA foreign_keys = ON;");

const addFav = (user_id, neighbourhood_id) => {
    let result = db.prepare(`
        INSERT INTO favorite(user_id, neighbourhood_id) VALUES (
        :user_id,
        :neighbourhood_id
        )
        `).run({
        "user_id": user_id,
        "neighbourhood_id": neighbourhood_id
    });
    return result
}
const transaction = () => {

    db.prepare(`
    BEGIN TRANSACTION;
    `).run();

    let transferAmount = 3;

    try {
        db.prepare(`
    UPDATE favorite 
    SET neighbourhood_id = 5
    WHERE user_id = 5
    `).run(transferAmount);

        // process.exit();

        db.prepare(`
    UPDATE favorite
    SET neighbourhood_id = 6
    WHERE user_id = 6
    `).run(transferAmount);

        db.prepare(`
    COMMIT;
    `).run();
    } catch (err) {
        db.prepare('ROLLBACK;').run();
        console.log("somethingwent wrong");
    }
}

export default addFav;