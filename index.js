const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB Atlas connection string

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Todo Schema
const todoSchema = new mongoose.Schema({
  task: String,
});

const Todo = mongoose.model('Todo', todoSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render('index', { todos });
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/add', async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
  });
  try {
    await newTodo.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/delete', async (req, res) => {
  const todoId = req.body.todoId;
  try {
    await Todo.findByIdAndDelete(todoId);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).send('Server Error');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});