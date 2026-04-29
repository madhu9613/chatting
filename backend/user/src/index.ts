import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { createClient } from 'redis';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1', userRoutes);

const redisurl=process.env.REDIS_URL ;

if(!redisurl){
    throw new Error("REDIS_URL is not defined in environment variables");   
}
console.log("REDIS_URL:", redisurl); // Debugging line to check the value of REDIS_URL

export const redisClient = createClient({
    url: redisurl,
});

const startServer = async () => {
    try {
        // Connect MongoDB
        await connectDB();

        // Connect Redis
        await redisClient.connect();
        console.log("Connected to Redis successfully");

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server running on port ${port} `);
        });

    } catch (error) {
        console.error("Startup error ", error);
        process.exit(1);
    }
};

startServer();