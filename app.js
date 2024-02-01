const express = require('express');
const app = express();

// Landing Page
app.get('/', (req, res) => {
  res.send('Landing Page');
});

// Registration routes
app.get('/api/v1/sessions', (req, res) => {
  res.send('Hello from Users Route');
});

//Tasks routes
app.get('/api/v1/tasks', (req, res) => {
  res.send('These are your tasks routes');
});
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
