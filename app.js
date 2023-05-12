const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
//Routes
const authRoutes = require('./routes/auth/auth.js')
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/', authRoutes)

// app.post('/', (req, res) => {
//   const user = new User(req.body);
//   user.save().then(response => {
//    return res.status(200).json(response);
//   }).catch(error => {
//    return res.status(500).json({ error: error.message });
//   })
// });

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