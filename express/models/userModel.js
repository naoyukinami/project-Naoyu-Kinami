import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
const db = new DatabaseSync(path.join(import.meta.dirname, './data.db'));
db.exec("PRAGMA foreign_keys = ON;");

const createUser = (user_name, email) => {
    let result = db.prepare(`
        INSERT INTO user(user_name, email) VALUES (
        :user_name,
        :email
        )
        `).run({
            "user_name": user_name,
            "email": email
        });
        return result;
}

const removeUser = (user_id) => {
    let result2 = db.prepare(`
        DELETE FROM users WHERE user_id = ?
        `).run({
            "user_id": user_id
        });
        return result2;
}
export { createUser, removeUser };