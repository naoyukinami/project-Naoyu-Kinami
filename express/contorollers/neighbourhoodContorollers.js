import neighbourhoodModel from './../models/neighbourhoodModel.js';


const getNeighbourhoods = (req, res) => {
    res.json(neighbourhoodModel.getNeighbourhoods()); 
}

const getByNeighbourhood = (req, res) => {
    const neighbourhood = req.params.neighbourhoodName;
    const page = Number(req.query.page) || 1;
    console.log("search", neighbourhood);

    const result = neighbourhoodModel.getByNeighbourhood({
        neighbourhoodName: neighbourhood,
        page
    })
    //const getByNeighbourhood = ({neighbourhoodName, page}) => {・・・　　　　　　
    //in nighbourhoodModel.js, it passes only ONE object, but I passed separately, that's why it causes TypeError
    // res.json(neighbourhoodModel.getByNeighbourhood(neighbourhood, page)); 
    res.json(result);

    console.log("neighbourhood:", neighbourhood, "page:", page);
}

const countConstructionByNeighbourhood = (req, res) => {
    const result = neighbourhoodModel.countConstructionByNeighbourhood()
    res.json(result); 
}

export { getNeighbourhoods, getByNeighbourhood, countConstructionByNeighbourhood };