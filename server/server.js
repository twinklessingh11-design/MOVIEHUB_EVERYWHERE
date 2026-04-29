import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import {serve} from "inngest/express";
import {inngest,functions} from "./inngest/index.js"

const app = express();
const port = process.env.PORT||4000;

await connectDB()

//middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


//Api routes
app.get('/',(req,res)=>res.send('Server is live!'))
// app.use('/api/inngest',serve({client:inngest,functions}))
app.use('/api/inngest',serve({client:inngest,functions:functions,signingKey:process.env.INNGEST_SIGNING_KEY}));

app.listen(port,()=>console.log(`Server listening at http://localhost:${port}`));