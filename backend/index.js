import express from 'express'
import mongoose from 'mongoose';
import { PORT, MONGO_URL } from './config.js'
import cors from 'cors'
import authRoute from './Routes/authRoute.js'


const app = express();

app.use(express.json());
app.use(cors());

app.use("/", authRoute );

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("MONGODB Connected");
    }).catch((error) => {
        console.log(error);
    })

app.listen(PORT, () => {
    console.log(`Server is runnning at PORT ${PORT}`);
})
