import express from 'express';

const app = express();
const server = app.listen(3005, ()=>console.log("listening"));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import router from './routes/index.js'; 
app.use("/api/v1/projects", router);

import userRouter from './routes/userRouter.js';
app.use("/api/v1/users", userRouter);

// app.post('/users', (req, res) => {
//     let newUser = req.body; 
//     let newUserID = Math.max(...user.map(user=>user.id));
//     newUserID++; 
//     newUser.id = newUserID;
//     user.push(newUser);

//     res.set('Location', `/user/${newUserID}`);
//     res.json({
//         message: "User successfully created",
//         link: `/api/users/${newUserID}`
//     });
// });

import favRouter from './routes/favRouter.js';
app.use("/api/v1/favorite", favRouter);

// app.post('/project', (req, res) => {
//     const { title, completeDate, street_id } = req.body;
//     let newProject = req.body;
//     let newProjectID = Math.max(...project.map(project => project.id));
//     newProjectID++;
//     newProject.id = newProjectID;
//     project.push(newProject);

//     res.set('Location', `/project/${newProjectID}`);
//     res.json({
//         message: "Project successfully added!",
//         link: `/api/v1/projects/${newProjectID}`
//     });
// });