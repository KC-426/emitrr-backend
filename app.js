const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors')

const PORT = process.env.PORT || 3000;
const { MONGOD_URI } = process.env;

const userRoutes = require('./routes/user');
const deckRoutes = require('./routes/deck')
const loginRoutes = require('./routes/login')

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(userRoutes);
app.use(deckRoutes)
app.use(loginRoutes)

app.get("/", (req, res) => {
  res.send("WORKING");
});

mongoose.connect(MONGOD_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));
