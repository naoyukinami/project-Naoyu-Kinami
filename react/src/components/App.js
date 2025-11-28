import { useState } from "react";
import ImportMap from "./ImportMap.js";
import TypeChooser from "./TypeChooser.js";
import Construction  from "./Construction.js";
import TypeNeighbourhood from "./TypeNeighbourhood.js";
import Neighbourhood from "./Neighbourhood.js";
import User from "./User.js";
import Favorite from "./Favorite.js";

const App = props => {

    const [ chosen, setChosen ] = useState('');
    const [ chosen2, setChosen2] = useState('');

    return (<>
        <div className="h1_box">
            <h1>Road Ahead Projects Under Construction</h1>
        </div>
        <ImportMap />
        <div className="flex">
            <div className="construction_box">
                <TypeChooser setChosen =  { setChosen } chosen={chosen} />
                <Construction chosen={chosen}/>
            </div>
            <div className="neighbourhood_box">
                <TypeNeighbourhood setChosen2 =  { setChosen2 } chosen2={chosen2} />
                {/* <SubmitConstruction /> */}
                <Neighbourhood  chosen2={chosen2}/>
            </div>
        </div>
        <div className="flex2">
            <User />
            <Favorite />
        </div>
    </>
    );
}

export default App;