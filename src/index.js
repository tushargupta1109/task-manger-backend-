const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(3000, () => {
  console.log("server is running on " + 3000);
});
