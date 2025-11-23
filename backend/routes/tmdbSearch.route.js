import express from "express";
import axios from "axios";

const router = express.Router();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_URL = "https://api.themoviedb.org/3";

// 🎯 Search for a movie by title
router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const response = await axios.get(`${TMDB_URL}/search/movie`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`, // v4 token
        Accept: "application/json",
      },
    });

    const results = response.data.results || [];

    // Return only useful fields
    const cleanResults = results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }));

    res.status(200).json({
      status: "success",
      results: cleanResults,
    });
  } catch (error) {
    console.error("TMDB Search Error:", error.message);
    res.status(500).json({ error: "TMDB search failed" });
  }
});

export default router;
