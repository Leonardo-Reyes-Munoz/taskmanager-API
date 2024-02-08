require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
// connectDB
const connectDB = require('./db/connect');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 request per windowsMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Landing Page
app.get('/', (req, res) => {
  res.send('Landing Page/API Documentation');
});

// Registration/Sign-in routes
app.use('/api/v1/sessions', require('./routes/sessionRoutes'));

// user authentication
const authenticateUser = require('./middleware/authentication');

//Tasks routes
app.use('/api/v1/tasks', authenticateUser, require('./routes/taskRoutes'));

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
