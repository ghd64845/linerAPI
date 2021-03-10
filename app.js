require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { sequelize } = require('./models');
const authRouter = require('./routes/auth');

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

app.use('/auth', authRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
  res.status(err.status || 500);
  res.end();
});

app.listen(PORT, () => {
  console.log(`linten to port ${PORT}`);
});
