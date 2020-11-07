const { User } = require('../db');

const router = require('express').Router();

router.use('/google', require('./google'));

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(401).send('User not found');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect password');
    } else {
      // if all good, login with this user
      // also sets a cookie on the client side
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

// deleting/invalidates the cookie
// this could also be a post route
router.delete('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

// if we forget who's logged in on the frontend
router.get('/me', (req, res) => {
  res.json(req.user);
});

module.exports = router;
