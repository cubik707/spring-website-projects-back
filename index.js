import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import {ProjectsController, UserController} from './src/controllers/index.js';
import {loginValidation} from './src/validations/auth-validation.js';
import handleValidationError from './src/middlewares/handle-validation-error.js';
import checkAuth from './src/middlewares/check-auth.js';
import {connectToDB} from "./src/config/db.js";
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(express.static('public'))

app.post(
  '/login',
  loginValidation,
  handleValidationError,
  UserController.login
);

app.get('/projects', checkAuth, ProjectsController.getAllProjects);

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log('SERVER STARTED ON PORT: ' + port);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
};

startServer();
