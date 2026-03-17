import express from "express";
import cors from "cors";
import cafeRoutes from "./routes/cafeRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/cafes", cafeRoutes);
app.use("/users", userRoutes);
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
