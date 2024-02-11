require('dotenv').config();
require('express-async-errors');
const cors = require("cors");

const express = require('express');
const connectDB = require('./db')
const app = express();

// controller
const {sendEmail} = require('./controllers')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(
  cors({
    origin: "*", // or '*' to allow all origins
  })
);
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1> <a href="/send">Send Email</a>');
});

app.get('/send', sendEmail)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();