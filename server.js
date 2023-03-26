import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { join } from 'path';
import { connect, connection } from 'mongoose';
import session from 'express-session';
import { create } from 'connect-mongo';
require('dotenv').config();

const app = express();

//Walidacja!

const NODE_ENV = process.env.NODE_ENV;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const SECRET = process.env.SECRET;

connectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.telw8lc.mongodb.net/Ads_FullStackAppDB?retryWrites=true&w=majority`;

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = connection;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:8000',
      'https://lit-wave-35985.herokuapp.com',
      'https://adsfullstackapp.kaz4486.repl.co/',
    ],
    credentials: true,
  })
);

app.use(urlencoded({ extended: false }));
app.use(json());

app.set('trust proxy', 1);
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    store: create({
      mongoUrl: connectionString,
      collection: 'sessions',
    }),
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
  })
);

import adsRoutes from './routes/ads.routes';
import authRoutes from './routes/auth.routes';

app.use('/api', adsRoutes);
// app.use('/api', userRoutes);
app.use('/auth', authRoutes);
// może być też api/auth

app.use(static(join(__dirname, '/client/build')));
app.use(static(join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '/client/build/index.html'));
});

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err.message));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});
