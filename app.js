const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//Routes
const authRoutes = require('./routes/auth/auth.js');
const accRoutes = require('./routes/account');
const tranRoutes = require('./routes/transaction');
const catRoutes = require('./routes/category');
const Session = require("./models/Session");

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//cors
app.use(cors());

app.get('/test', async (req, res) => {
  const session = await Session.findOne({sessionId: req.cookies.s_id});

  if (session) {
    await Session.deleteOne({'_id': session.id});
  }
  // res.clearCookie('username');
  return res.status(200).json('test');
});

app.use('/', authRoutes);
app.use('/account', accRoutes);
// app.use('/category', catRoutes);
app.use('/transactions', tranRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(result => {
    if (result) {
      app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
    }
  })
  .catch(error => {
    console.error(error);
});