import constructionModel from '../models/constructionModel.js';

//get all constructions, return as JSON
const getConstructions = (req, res) => {
    // console.log("testing");
    res.json(constructionModel.getConstructions());
}

//return 特定のconstruction
const getOneConstruction = (req, res) => {
    const id = req.params.id;
    const ofID = constructionModel.getOneConstruction(id);
    res.json(ofID);
}



// const postProject = (req, res) => {
//     const { title, completeDate, streetID } = req.body;

//     res.json(constructionModel.insertNewProject(
//         req.body.title,
//         req.body.completeDate,
//         req.body.streetID
//     ));
// }

//update project
const updateProject = (req, res) => {
    const id = req.params.id;
    const { completeDate } = req.body;
    const result = constructionModel.updateProject(id, completeDate);
    if(result === 0){
        return res.status(404).json({ error: "Project not found" });
    }

    res.json({
        message: "Project updated successfully",
        id,
        completeDate
    })
}

export { getConstructions, getOneConstruction, updateProject };