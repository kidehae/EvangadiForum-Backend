// const express = require("express");
// const app = express();
// const port = 2112;

// // ✅ Add this line BEFORE using any routes
// app.use(express.json());

// const userRoutes = require("./Routes/userRoute");
// app.use("/api/user", userRoutes);

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });







require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Port = process.env.PORT;
const userRouter = require("./Routes/userRoute.js");
// const answerRouter = require("./server/api/answer/answer.router.jsx");
// const questionRouter = require("./server/api/question/question.router.jsx");
const auth = require("./MiddleWare/authMiddleWare.js");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (request, response) => response.status(200).send("hello world"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/answer", answerRouter);
app.use("/api/question", questionRouter);

app.listen(Port, () => console.log(`Listening at http://localhost:${Port}`));

