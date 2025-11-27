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
            "neighbourhood_id":neighbourhood_id
        });
        return result
}

export default addFav;