// import { useState } from 'react';

// const SubmitConstruction = props => {
//     const [ title, setTitle ] = useState('');
//     const [ date, setDate ] = useState('');
//     const [ street, setStreet ] = useState('');

//     const submitNewConstruction = event => {
//         event.preventDefault();
//         fetch(`/api/v1/projects`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 title: title,
//                 completeDate: date,
//                 streetID: street
//             })
//         })
//             .then(r => {
//                 // Check for 4xx and 5xx errors in the response from the server
//                 if (r.ok == false) {
//                     // this error will be caught by catch
//                     throw new Error();
//                 }
//                     return r.json();
//             })
//             .then(response => {
//                 console.log(response);
//             })
//             .catch(error => {
//                 console.log("submit failed");
//             })
//             ;
//     }
//     return (<div>
//         <h2>Submit a new construction</h2>
//         <form onSubmit={e => submitNewConstruction(e)}>
//             <label>
//                 title:
//                 <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
//             </label>
//             <label>
//                 Complete Date:
//                 <input value={date} onChange={e => setDate(e.target.value)}></input>
//             </label>
//             <label>
//                 Street ID:
//                 <input value={street} onChange={(e) => setStreet(e.target.value)} required />
//             </label>
//             <button>Submit new task</button>
//         </form>
//     </div>)
// }

// export default SubmitConstruction;