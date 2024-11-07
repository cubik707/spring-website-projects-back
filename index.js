import express from 'express';
import cors from 'cors';
import { UserController, ProjectsController } from './controllers/index.js';
import { loginValidation } from './validations/auth-validation.js';
import handleValidationError from './utils/handle-validation-error.js';
import checkAuth from './utils/check-auth.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post(
  '/login',
  loginValidation,
  handleValidationError,
  UserController.login
);

app.get('/projects', checkAuth, ProjectsController.getAllProjects);

app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT: ' + PORT);
});
