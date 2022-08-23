const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGODB_URI } = require("./config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogController");
const userRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController")
const {errorHandler, requestLogger, tokenExtractor} = require("./utils/middleware")
logger.info(`connecting to ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
.then(() => {
    logger.info("connected to MONGODB")
})
.catch((err) => {
    logger.err(err)
});

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use(requestLogger);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler)
module.exports = app;
