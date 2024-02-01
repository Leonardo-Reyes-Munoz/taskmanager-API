const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from testing route');
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
