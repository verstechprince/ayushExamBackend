// coursesController.js
const Course = require('../models/courseModel'); 
//ho gya link
// Create a new course
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a course by ID
const updateCourseById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'fees', 'syllabus', 'duration', 'classSchedule'];

  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }

    res.send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a course by ID
const deleteCourseById = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }

    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Export the functions
module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
