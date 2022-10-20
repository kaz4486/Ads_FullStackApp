const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();

//Walidacja!

const NODE_ENV = process.env.NODE_ENV;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const SECRET = process.env.SECRET;

let dbUri = ''; //??

if (NODE_ENV === 'production') dbUri = connectionString;
else if (NODE_ENV === 'test')
  dbUri = 'mongodb://localhost:27017/Ads_FullStackAppDBtest';
else dbUri = 'mongodb://localhost:27017/Ads_FullStackAppDB';

connectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.telw8lc.mongodb.net/Ads_FullStackAppDB?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8000',
      'https://lit-wave-35985.herokuapp.com',
    ],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: connectionString,
      collection: 'sessions',
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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
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
