import express from "express";
import morgan from "morgan";
import cors from 'cors';

// Init
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.get('/', (_, res) => {
    res.send(`API listening at ${app.get('port')}`);
});

export default app;