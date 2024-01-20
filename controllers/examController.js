const QuestionModel = require("../models/question");
const timeModel = require("../models/timeModel");
const QtimeModel = require("../models/queTime");

const uploadingQuestion = async (req, res) => {
  try {
    const {
      parseData,
      hours,
      minutes,
      seconds,
      innerHours,
      innerMinutes,
      innerSeconds,
    } = req.body;
    console.log("question data in backend ", parseData);

    const existingTimeQ = await QtimeModel.findOneAndUpdate(
      {},
      { innerHours, innerMinutes, innerSeconds },
      { new: true, upsert: true }
    );

    // Update existing time details if they exist or create new if they don't
    const existingTime = await timeModel.findOneAndUpdate(
      {},
      { hours, minutes, seconds },
      { new: true, upsert: true }
    );

    // Clear existing questions
    await QuestionModel.deleteMany({});

    // Insert new questions
    const insertedQuestions = await QuestionModel.insertMany(parseData);

    res.status(201).json({
      success: true,
      questions: insertedQuestions,
      time: existingTime || { hours, minutes, seconds }, // Use existingTime if it exists, otherwise use the new time details
      Qtime: existingTimeQ || { innerHours, innerMinutes, innerSeconds },
    });
  } catch (error) {
    console.error("Error storing questions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const fetchQuestions = async (req, res) => {
  try {
    // Assuming you have a Question model
    // Adjust this based on your actual Mongoose model and database structure
    const questions = await QuestionModel.find({}).exec();

    // Assuming you have a Time model
    const time = await timeModel.findOne({}).exec();
    const Qtime = await QtimeModel.findOne({}).exec();

    res.status(200).json({ success: true, questions, time, Qtime });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { uploadingQuestion, fetchQuestions };
