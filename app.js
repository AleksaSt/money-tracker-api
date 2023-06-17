const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
//Routes
const authRoutes = require('./routes/auth/auth.js')
require('dotenv').config();


// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/verify', (req, res) => {
  res.send('verification page!');
});


app.use('/', authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(result => {
    if (result) {
      console.log('database connected');
      app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
    }
  })
  .catch(error => {
    console.error(error);
});