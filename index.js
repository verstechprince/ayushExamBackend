const app = require("./app"); // Assuming your Express app configuration is in app.js

const PORT = process.env.PORT || 3001; // Set the port number

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handling unhandled promise rejections globally (Optional, for demonstration purposes)
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
