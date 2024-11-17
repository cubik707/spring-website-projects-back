import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { ProjectsController, UserController } from './src/controllers/index.js';
import {
  loginValidation,
  signupValidation,
} from './src/validations/auth-validation.js';
import handleValidationError from './src/middlewares/handle-validation-error.js';
import checkAuth from './src/middlewares/check-auth.js';
import { connectToDB } from './src/config/db.js';
import * as TokenController from './src/controllers/token-controller.js';
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: process.env.REACT_APP_CLIENT_ORIGIN,
  credentials: true,
}));

app.use(express.static('public'));

app.post(
  '/login',
  loginValidation,
  handleValidationError,
  UserController.login
);
app.post(
  '/signup',
  signupValidation,
  handleValidationError,
  UserController.signup
);
app.get('/me', checkAuth, UserController.getMe);

app.post('/refresh-token', TokenController.refreshToken);

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
