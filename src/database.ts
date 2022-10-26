import mongoose from "mongoose";
import config from './config/config';

console.log(config.DB.URI);
mongoose.connect(config.DB.URI);

mongoose.connection.on('open', () => {
    console.log(`MongoDB: connection stablished`);
});

mongoose.connection.on('error', err => {
    console.log(err);
    process.exit(0);
});

