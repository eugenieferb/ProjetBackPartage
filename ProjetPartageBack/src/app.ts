import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { usersController } from './controller/users-controller';
import { annoncesController } from './controller/annonces-controller';
import { empruntsController } from './controller/emprunts-controller';



const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', usersController);
app.use('/api/annonces', annoncesController);
app.use('/api/emprunts', empruntsController);

app.listen(port, () => {
    console.log('listening on http://localhost:'+port);
});