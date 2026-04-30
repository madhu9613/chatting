import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import chatRoutes from './routes/chat';

dotenv.config();
const app=express()
const port=process.env.PORT || 3000

connectDB();

app.use(express.json());
app.use('/api/v1', chatRoutes);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

