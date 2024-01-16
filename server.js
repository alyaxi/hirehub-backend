const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/Auth/auth-routes");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/ErrorHandler");
const AdminRoutes = require("./routes/Admin/AdminRoutes");
const EmployerRoutes = require("./routes/Employers/employer-routes")
const JobPostingRoutes = require("./routes/Employers/job-posting-routes")
const candidateRoutes = require("./routes/Candidates/candidate-routes")
const AppliedJobRoutes = require("./routes/Candidates/appliedJobs-routes")

const mongoose = require('mongoose');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.static('uploads'));
const corsOption = { credentials: true, origin: process.env.URL || "*" };

app.use(errorHandler)
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

//Routes
app.use("/api", authRoutes);
app.use("/api", AdminRoutes);
app.use("/api", EmployerRoutes);
app.use("/api", JobPostingRoutes);
app.use("/api", candidateRoutes);
app.use("/api", AppliedJobRoutes);



const PORT = process.env.PORT || 8000;


mongoose.connect("mongodb://database:27017/hrhub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  loadBalanced: mongoose.NativeBuffer,
});


// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err);

});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
 
  res.send("Hello World ");

});