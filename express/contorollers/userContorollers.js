import { createUser, removeUser } from '../models/userModel.js';

// const postUser = (req, res) => {
//     const { username, email } = req.body;
//
//     res.json(userModel.createUser(
//         req.body.username,
//         req.body.email
//     ));
// };

const postUser = (req, res) => {
    try {
        const { username, email } = req.body;

        const newUser = createUser(username, email);

        res.json({
            id: newUser.lastInsertRowid,
            username,
            email
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failing to create user" });
    }
};

//delete user
const deleteUser = (req, res) => {
    try {
        const id = req.params.id;
        removeUser(id);

        res.json({
            message: "Deleted successfuly",
            id: id
        });
    } catch(error) {
        console.log("Error deleting the user", error);
        res.status(500).json({error: "server error"});
    }
}


export { postUser, deleteUser };
