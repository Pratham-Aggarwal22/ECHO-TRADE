// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema Definitions
const appleNewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date
});

const stockPriceSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  date: Date
});

const userSchema = new mongoose.Schema({
  username: String,
  details: String
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date
});

// Models
const AppleNews = mongoose.model('Apple', appleNewsSchema);
const StockPrice = mongoose.model('Stock_Price', stockPriceSchema);
const User = mongoose.model('User', userSchema);
const Article = mongoose.model('Article', articleSchema);

// Routes
app.get('/api/apple/news', async (req, res) => {
  try {
    const news = await AppleNews.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/stock/prices', async (req, res) => {
  try {
    const prices = await StockPrice.find();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});