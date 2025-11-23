import express from "express";
import axios from "axios";

const router = express.Router();

// FastAPI URL
const PY_API = process.env.PY_AI_URL;

router.get("/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const response = await axios.get(`${PY_API}/recommend`, {
      params: { movie_title: title },
    });

    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Recommendation API error:", error);
    res.status(500).json({
      status: "error",
      message: "Could not fetch recommendations",
    });
  }
});

export default router;
