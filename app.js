require('dotenv').config();

const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');

app.use(express.json());

// Landing Page
app.get('/', (req, res) => {
  res.send('Landing Page/API Documentation');
});

// Registration/Sign-in routes
app.use('/api/v1/sessions', require('./routes/sessionRoutes'));

//Tasks routes
app.use('/api/v1/tasks', require('./routes/taskRoutes'));

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
