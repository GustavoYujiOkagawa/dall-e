import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';


import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";




dotenv.config();


const app = express();

const corsOptions = {
    origin: ['https://dall-e-omega-peach.vercel.app', 'http://localhost:3000'], // Adicione os domínios permitidos aqui
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    credentials: true // Permite o envio de cookies e credenciais
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


app.get('/', async (req, res) => {
    res.send('Hello from DALL-E')
})


const startServer = async () => {

    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    }catch (error){
        console.log(error)
    }
    

    
}

startServer();