const express = require('express');
const PORT = process.env.PORT || 2000;
const app = express();
const bodyParser = require('body-parser');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user')
const cartRouter = require('./routes/cart')
require('dotenv').config();
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

//headers
app.use((req, res, next) => {
  res.header('Allow-Origin', "*");
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header('Content-Type', 'application/json')
  next();
})



app.use('/product', productRouter)

app.use('/', userRouter)

app.use('/cart', cartRouter)



mongoose.connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

