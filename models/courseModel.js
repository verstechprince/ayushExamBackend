const mongoose = require('mongoose');

// Create a Mongoose schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fees: {
    type: String,
    required: true
  },
  syllabus: {
      type: [String], // Assuming each item in the array is a string
      default: []
  },
  duration: {
    type: String,
    required: true
  },
  classSchedule: {
    type: String,
    required: true
  }
});

// Create a Mongoose model
const Course = mongoose.model('Course', courseSchema);

// Export the model
module.exports = Course;
