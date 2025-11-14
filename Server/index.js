require("dotenv").config();
const express = require("express");
const app = express();
const chalk = require("chalk");



const userRoutes = require("./Routes/User");
const profileRoutes = require("./Routes/Profile");
const paymentRoutes = require("./Routes/Payment");
const courseRoutes = require("./Routes/Course");


const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./Config/cloudinary");
const fileUpload = require("express-fileupload");


const PORT = process.env.PORT||5000;

//database connect

const dbConnect = require("./Config/database");
dbConnect.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);



// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Server start
app.listen(PORT, () => {
  console.log(
    chalk.green.bold(" App is running at: ") +
      chalk.cyan(`http://localhost:${PORT}`)
  );
});


