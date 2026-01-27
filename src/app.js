import express from 'express';

//create an express app
const app = express();

//json request from the client side
//middleware to parse JSON bodies
//in the request object
//this is necessary to handle JSON payloads in requests
app.use(express.json());

//import routes
import userRoutes from './routes/user.routes.js';

//routes declaration/middleware
app.use("/api/v1/users", userRoutes);

//exmaple routes --> http://localhost:3000/api/v1/users/register

export default app;