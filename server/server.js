const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("./utils/connectDB")();
const cookieParser = require("cookie-parser");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 7050;

//cron for trial period
cron.schedule("0 0 * * * *", async () => {
  try {
    //get current date
    const today = new Date();
    await User.updateMany(
      {
        trialActive: true,
        trialExpires: { $lt: today },
      },
      {
        trialActive: false,
        subscriptiionPlan: "Free",
        monthlyRequestCount: 5,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//crn for free plan
cron.schedule("0 0 1 * * *", async () => {
  try {
    //get current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptiionPlan: "Free",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//crn for basic plan
cron.schedule("0 0 1 * * *", async () => {
  try {
    //get current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptiionPlan: "Basic",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//crn for premium plan
cron.schedule("0 0 1 * * *", async () => {
  try {
    //get current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptiionPlan: "Premium",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//-----Middlewares-----
app.use(express.json());
app.use(cookieParser()); //pass the cookie automatically

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
//-----Routes-----
app.use("/api/v1/users", userRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);
//-----Error handler-----
app.use(errorHandler);
//start server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
