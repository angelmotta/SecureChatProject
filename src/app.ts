import express from "express";
import morgan from "morgan";
import cors from 'cors';
import myRouter from './routes/app.routes';

// Init
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use(myRouter);

export default app;