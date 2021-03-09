require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { sequelize } = require('./models');

const app = express();
sequelize.sync();

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
  credentials: true,
};
const { PORT, COOKIE_SECRET } = process.env;

app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser(COOKIE_SECRET));
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

app.listen(PORT, () => {
  console.log(`linten to port ${PORT}`);
});
