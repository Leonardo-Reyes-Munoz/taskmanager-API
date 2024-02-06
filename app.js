require('dotenv').config();
require('express-async-errors');

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

// Error handlers
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error-handler'));

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
