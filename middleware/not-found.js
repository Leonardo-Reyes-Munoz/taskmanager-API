const { StatusCodes } = require('http-status-codes');

const notFound = (req, res) =>
  res
    .status(StatusCodes.NOT_FOUND)
    .send(`That page (${req.url}) was not found`);

module.exports = notFound;
