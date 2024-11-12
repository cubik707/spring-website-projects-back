import express from 'express';
import cors from 'cors';
import {ProjectsController, UserController} from './controllers/index.js';
import {loginValidation} from './validations/auth-validation.js';
import handleValidationError from './middlewares/handle-validation-error.js';
import checkAuth from './middlewares/check-auth.js';
import 'dotenv/config'
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

app.listen(port, () => {
  console.log('SERVER STARTED ON PORT: ' + port);
});
