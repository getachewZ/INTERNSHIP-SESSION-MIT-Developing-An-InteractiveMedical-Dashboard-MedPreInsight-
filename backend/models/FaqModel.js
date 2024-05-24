const mongoose = require('mongoose');

// Define FAQ schema
const faqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Create FAQ model
const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
