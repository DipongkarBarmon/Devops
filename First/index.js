// const express =require('express')

import express from 'express'

// const mongoose =require('mongoose')
import mongoose from 'mongoose'

import postRouter from './routes/postRoute.js'

import { MONGO_IP,MONGO_PASSWORD,MONGO_PORT,MONGO_USER } from './config/mongoConfig.js'

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ip_address 172.18.0.2 for mongo container
const mongoURL =`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry=()=>{
     mongoose.connect(mongoURL)
    .then(()=>{console.log("MongoDB connected successfully!")})
    .catch((e)=>{
        console.log(e)
        setTimeout(connectWithRetry,5000)
    })  
}

connectWithRetry()

app.get('/',(req,res)=>{
    console.log('Correct')
    res.send(`<h1>Hi There!</h1>`)
})

app.use('/api/v1/posts',postRouter)

const port = process.env.PORT || 3000;

app.listen(port,()=>{ console.log(`Server started at PORT ${port}`)})
