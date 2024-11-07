import express from 'express';
import cors from 'cors';
import {UserController} from "./controllers/index.js";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/login', UserController.login);

app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT: ' + PORT);
});
