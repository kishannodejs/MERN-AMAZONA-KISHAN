import express from 'express';
import cors from 'cors';

import data from './data.js';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  console.log(product);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  console.log(product);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
