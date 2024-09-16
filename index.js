const express = require('express');
const dotenv = require('dotenv');
const bodyParser=require('body-parser');
const connectDB = require('./config/db');

dotenv.config();



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use(express.json());

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);  
app.use('/api/tasks', taskRoutes);  
app.use('/api/users', userRoutes);  

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
