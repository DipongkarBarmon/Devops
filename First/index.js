// const express =require('express')

import express from 'express'

// const mongoose =require('mongoose')
import mongoose from 'mongoose'

import session from "express-session";

import { RedisStore } from "connect-redis";

import { createClient } from "redis";

import cors from "cors";




import postRouter from './routes/postRoute.js'

import userRouter from './routes/userRoute.js'

import { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER, REDIS_URL, REDIS_PORT, SESSION_SECRET } from './config/mongoConfig.js'

const redisClient = createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`
})
const app = express()

app.use(cors({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ip_address 172.18.0.2 for mongo container
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose.connect(mongoURL)
    .then(() => { console.log("MongoDB connected successfully!") })
    .catch((e) => {
      console.log(e)
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

// Connect to Redis with error handling
redisClient.on('error', (err) => {
  console.log('Redis Client Error:', err);
});


await redisClient.connect().catch((err) => {
  console.log('Failed to connect to Redis:', err);
  process.exit(1);
});

console.log('Redis connected successfully!');

// Create Redis session store
//const RedisStore = connectRedis(session);

app.enable("trust proxy")

// 3. Configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 30
    }
  })
); 

app.get('/api/v1', (req, res) => {
  console.log('Correct')
  res.send(`<h1>Hi There!</h1>`)
  console.log("yeah it run")
  
})

app.use('/api/v1/posts', postRouter)
app.use('/api/v1/user', userRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Server started at PORT ${port}`) })
