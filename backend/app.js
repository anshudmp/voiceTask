const express = require('express')
const app = express();
const ProjectRoutes = require('./api/routes/projects')
const TaskRoutes = require('./api/routes/task');
const userRoutes = require('./api/routes/user')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Allow requests from your React app's domain (replace with your React app's domain)
const allowedOrigins = ['http://localhost:3000'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
mongoose.connect('mongodb+srv://kushalreddy5466:'+ process.env.MONGO_ATLAS_PW+'@taskmangement.93reafy.mongodb.net/?retryWrites=true&w=majority',{
useNewUrlParser: true, 
useUnifiedTopology: true
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/projects',ProjectRoutes)
app.use('/tasks', TaskRoutes);
app.use('/user',userRoutes)

module.exports = app;