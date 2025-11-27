import { useState } from "react";

const User = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState(null);

    const submitUser = event => {
        event.preventDefault();

        fetch('/api/v1/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email
            })
        })
            .then(r => {
                if (!r.ok) {
                    throw new Error("Failed to create a user");
                }
                return r.json();
            })
            .then(data => {
                console.log("Success:", data);
                setUsername("");
                setEmail("");
                setUserID(data.id);
            })
            .catch(error => {
                console.log("creation failed", error);
            });
    };

    return (
        <div className="user_box">
            <h2>Create Account</h2>

            <form onSubmit={submitUser} className="user_form">
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <button>Create</button>
            </form>

            {userID &&
                <p>
                    Your User ID: <strong>{userID}</strong>
                </p>
            }
        </div>
    );
};

export default User;
