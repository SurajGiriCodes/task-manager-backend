const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "something wrong!!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
