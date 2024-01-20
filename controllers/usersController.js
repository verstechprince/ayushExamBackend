const User = require("../models/UserModel");
const ResultModel = require("../models/resultModel");

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.isUserRegistered = async (req, res) => {
  const { mobile, email } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ mobile }, { email }] });

    if (existingUser) {
      // User already exists
      return res.status(409).json({
        message:
          "User already registered. Try with a different mobile number or email.",
      });
    }

    // User is not registered
    return res
      .status(200)
      .json({ message: "User not registered. Proceed with registration." });
  } catch (error) {
    console.error("Error checking user registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.checkLoginCredentials = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User found, check password
      if (existingUser.password === password) {
        // Password matches, user is authenticated
        return res
          .status(200)
          .json({ message: "Login successful", data: existingUser });
      } else {
        // Password does not match
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      // User not found
      return res
        .status(404)
        .json({ message: "User not found. Please register." });
    }
  } catch (error) {
    console.error("Error checking login credentials:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.body.userId; // assuming userId is sent from the frontend

  try {
    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user data based on what is provided in the request
    if (req.body.name) {
      existingUser.name = req.body.name;
    }

    if (req.body.mobile) {
      existingUser.mobile = req.body.mobile;
    }

    if (req.body.email) {
      existingUser.email = req.body.email;
    }

    if (req.body.password) {
      existingUser.password = req.body.password;
    }

    // Save the updated user data
    await existingUser.save();

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
exports.getRegisteredStudents = async (req, res) => {
  try {
    const registeredStudents = await User.find(
      {},
      { name: 1, mobile: 1, email: 1, _id: 0 }
    );

    res.status(200).json({ success: true, students: registeredStudents });
  } catch (error) {
    console.error("Error fetching registered students:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.saveResult = async (req, res) => {
  try {
    const {
      userId,
      correctAnswers,
      attempted,
      skipped,
      questionsLength,
      marksPerQuestion,
      examStartTime,
      timeTaken,
    } = req.body;

    const result = new ResultModel({
      userId,
      correctAnswers,
      attempted,
      skipped,
      questionsLength,
      marksPerQuestion,
      examStartTime,
      timeTaken,
    });

    await result.save();

    res
      .status(201)
      .json({ success: true, message: "Result saved successfully." });
  } catch (error) {
    console.error("Error saving result:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getResult = async (req, res) => {
  try {
    // Fetch all results from the ResultModel
    const allResults = await ResultModel.find();

    res.status(200).json({ success: true, results: allResults });
  } catch (error) {
    console.error("Error fetching all results:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    // Fetch all results from the ResultModel
    const allResults = await ResultModel.find({}, { _id:0,
      __v: 0});

    // Fetch all registered users with results
    const usersWithResults = await User.find(
      { _id: { $in: allResults.map((result) => result.userId) } },
      { name: 1, mobile: 1, email: 1, _id: 1 }
    );

    // Combine user details with their respective results
    const combinedData = usersWithResults.map((user) => {
      const userResults = allResults.filter(
        (result) => result.userId === user._id.toString()
      );

      // Log the userResults to see if filtering is correct
      console.log(
        `UserId: ${user._id}, UserResults: ${JSON.stringify(userResults)}`
      );

      return {
        studentDetails: {
          userId: user._id,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
        },
        studentResults: userResults,
      };
    });

    res.status(200).json({ success: true, combinedData });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
