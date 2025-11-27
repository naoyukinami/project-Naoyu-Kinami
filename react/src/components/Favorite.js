import { useState } from "react";

const favorite = () => {
    const [ userID, setUserID ] = useState('');
    const [ neighbourID, setNeighbourID] = useState('');

    const submitFav = event => {
        event.preventDefault();

        fetch('/api/v1/favorite', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userID,
                neighbourhood_id: neighbourID
            })
        })
        .then(r=> {
            if (!r.ok) {
                throw new Error("Failed to create favorite");
            }
            return r.json();
        })
        .then(data => {
            console.log("Added fav:", data);
            setUserID("");
            setNeighbourID("");
        })
        .catch(error => {
            console.log("creation failed", error);
        });
    };

    return(
        <div className="fav_box">
        <h2>Add to Favorite</h2>

                    <form onSubmit={submitFav} className="fav_form">
                <label>
                    User ID:
                    <input
                        type="integer"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Neighbourhood ID:
                    <input
                        type="integer"
                        value={neighbourID}
                        onChange={(e) => setNeighbourID(e.target.value)}
                        required
                    />
                </label>

                <button>Save</button>
            </form>
        </div>
    )
}

export default favorite;