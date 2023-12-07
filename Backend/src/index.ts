import express from "express";
import dotenv from "dotenv";
import Route from "./Routers/itinerary.route";
import RouterInstance from './Routers/authentication.route'
import userRoute from './Routers/user.route'
import cors from 'cors'
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import  { PrismaClient } from '@prisma/client';
import fs from 'fs';

dotenv.config({ path: "./.env" });
const port=process.env.port||3000
const app= express()
declare module "express-session" {
  interface SessionData {
    isAuth: any;
    userID: any;
  }
}


app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
}))


//@ts-ignore


//@ts-ignore



app.use(express.urlencoded({ extended: true }));
app.use(
    expressSession({
        cookie: {
            maxAge: 60 * 60 * 1000, // ms
        },
        secret: process.env.secretKey,
        resave: false,
        saveUninitialized: false,
        store: new PrismaSessionStore(new PrismaClient(), {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);



app.use("/API",Route)
app.use("/user/",RouterInstance,userRoute)



app.listen(port,()=>{
  console.log(`server is running on port ${port}`)  
})



