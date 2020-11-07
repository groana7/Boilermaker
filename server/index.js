// this file is the server entry point

// imports
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const { db, User } = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');
// convention to be all caps
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') require('../secrets')

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'This is my biggest secret haha.',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

// where the static files are
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const runServer = async () => {
  await db.sync({ force: true });
  await dbStore.sync();
  app.listen(port, () => {
    console.log(`Serving on PORT ${port}`);
  });
};

runServer();
