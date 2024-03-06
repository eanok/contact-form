const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb+srv://eanok:eanok@cluster0.6hrr0vk.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Body Parser Middleware
app.use(bodyParser.json());

// Serve Static Files (HTML, CSS, JS)
app.use(express.static('public'));

// Your MongoDB Schema and Model (e.g., Contact)
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', ContactSchema);

// API endpoint to handle form submissions
app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new contact in MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
