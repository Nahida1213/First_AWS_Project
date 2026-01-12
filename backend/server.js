const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');


const app = express();
app.use(cors({origin:[
"http://www.taskfrontend.shop",
"http://taskfrontend.shop"
],
credentials:true
}));


app.use(express.json());

app.get('/api',(req,res)=>{
res.send('Api is working ,ci cd integration implemented');
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected to mongoDB'))
  .catch(err => console.error('mongoDB connection error:', err));


app.listen(process.env.PORT,'0.0.0.0', () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);