import axios from "axios";

const fetchCodeChefStats = async (username) => {
  try {
    console.log("Fetching stats for username:", username);
    const { data } = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);

    if (!data || !Array.isArray(data.ratingData)) {
      console.error("Invalid data format.");
      return null;
    }

    if (data.ratingData.length === 0) {
      console.warn("User is unrated. No rating data available.");
      return {
        rating: null,
        stars: 0,
        problemsSolved: data.problemsSolved || 0,
      };
    }

    return {
      ...data,
      problemsSolved: data.problemsSolved || 0,
    };
  } catch (err) {
    console.error("Error fetching CodeChef stats from API:", err.message);
    return null;
  }
};

export { fetchCodeChefStats };