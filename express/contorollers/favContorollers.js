import addFav from "../models/favModel.js";

const getFav = async (req, res) => {
    const { user_id, neighbourhood_id } = req.body;

    try {
        const result = await addFav(user_id, neighbourhood_id);
        res.status(201).json({
            message: "Added successfully",
            id: result.lastInsertRowid
        });
    } catch (err) {
        console.log("Error adding favorite:" ,err);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export default getFav;