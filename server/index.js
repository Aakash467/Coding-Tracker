import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);

const PORT = process.env.PORT || 5001;
app.get('/api/test', (req, res) => res.send('API is working'));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is in use, trying a different port...`);
        app.listen(0, () => console.log(`Server running on a different port`));
      } else {
        console.error(err);
      }
    });
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));
