const express = require('express')
const app = express();
const taskRoutes = require('./api/routes/tasks')
const userRoutes = require('./api/routes/user')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://kushalreddy5466:'+ process.env.MONGO_ATLAS_PW+'@taskmangement.93reafy.mongodb.net/?retryWrites=true&w=majority',{
useNewUrlParser: true, 
useUnifiedTopology: true
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/tasks',taskRoutes)

app.use('/user',userRoutes)

app.use((req,res,next) => {
    res.status(200).json({
        message:"It's Backend"
    })

});



module.exports = app;