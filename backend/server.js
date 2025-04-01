const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tasksRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', tasksRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 