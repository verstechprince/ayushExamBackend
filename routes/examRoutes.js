const express = require("express");
const router = express.Router();
const ExamController = require("../controllers/examController");
const userController = require('../controllers/usersController');
const coursesController = require('../controllers/courseController')

router.post('/api/questions',ExamController.uploadingQuestion)
router.get('/api/questions', ExamController.fetchQuestions);
router.post('/api/register', userController.registerUser);
router.post('/api/check-registration', userController.isUserRegistered);
router.post('/api/login', userController.checkLoginCredentials);
router.post('/api/update-profile', userController.updateUserProfile);
router.get('/api/get-registered-students', userController.getRegisteredStudents);
router.post('/save-result', userController.saveResult);
router.get('/api/get-result', userController.getResult);
router.get('/api/get-user-details/', userController.getUserDetails);


//courses route for admin and user
router.post('/courses', coursesController.createCourse);

// Get all courses
router.get('/courses', coursesController.getAllCourses);

// Get a specific course by ID
router.get('/courses/:id', coursesController.getCourseById);

// Update a course by ID
router.patch('/courses/:id', coursesController.updateCourseById);

// Delete a course by ID
router.delete('/courses/:id', coursesController.deleteCourseById);

router.all('*', (req, res) => res.json({ errorMessage: '404 You are on the wrong API route' }));

module.exports = router;
