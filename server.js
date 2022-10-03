const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});
//Walidacja!

const NODE_ENV = process.env.NODE_ENV;
let MongoDB_Username = process.env.MONGODB_USERNAME;
let MongoDB_Password = process.env.MONGODB_PASSWORD;
const secret = process.env.SECRET;
let dbUri = ''; //??

if (NODE_ENV === 'production') dbUri = 'url to remote db';
else if (NODE_ENV === 'test')
  dbUri = 'mongodb://localhost:27017/Ads_FullStackAppDBtest';
else dbUri = 'mongodb://localhost:27017/Ads_FullStackAppDB';

connectionString = `mongodb+srv://${MongoDB_Username}:${MongoDB_Password}@cluster0.telw8lc.mongodb.net/Ads_FullStackAppDB?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: secret,
    store: MongoStore.create({
      mongoUrl: connectionString,
      resave: false,
      saveUninitialized: false,
    }),
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
  })
);

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api', adsRoutes);
// app.use('/api', userRoutes);
app.use('/auth', authRoutes);
// może być też api/auth

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err.message));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
