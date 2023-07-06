import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import connect from './src/db/config/db.config';
import morgan from 'morgan';
import { RESPONSE } from './types';
import Routes from './src/routes';

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to NodeJs App using TypeScript'));

app.use('/api/', Routes)

app.use('*', (req, res) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found'
    } as RESPONSE)
})

connect();

app.listen(PORT, () => {
    console.log(`🚀🚀🚀🚀 on port ${PORT}`);
});


dotenv.config();