import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";

const RecommendedCard = ({ title }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchTMDB = async () => {
      try {
        const res = await axios.get("/api/v1/tmdb/search", {
          params: { query: title },
        });

        if (res.data.results && res.data.results.length > 0) {
          setMovie(res.data.results[0]);
        }
      } catch (error) {
        console.log("Error fetching TMDB for:", title);
      }
    };

    fetchTMDB();
  }, [title]);

  if (!movie) return null; // nothing to show

  return (
    <Link
      to={`/watch/${movie.id}`}
      className="w-52 flex-none cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <img
        src={
          movie.poster_path
            ? SMALL_IMG_BASE_URL + movie.poster_path
            : "/no-poster.png"
        }
        alt={movie.title || title}
        className="w-full h-auto rounded-md"
      />

      <h4 className="mt-2 text-lg font-semibold text-white truncate">
        {movie.title || movie.name || title}
      </h4>
    </Link>
  );
};

export default RecommendedCard;
