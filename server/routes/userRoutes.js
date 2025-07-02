const Router = require('express').Router;
const authenticate = require('../middleware/authenticate');
const userRouter = Router();
const client = require('../db');
const axios = require('axios')
require('dotenv').config();


//gets user details
userRouter.get('/', authenticate, async (req, res) => {
  return res.json({ user: req.user });

});











module.exports = userRouter;