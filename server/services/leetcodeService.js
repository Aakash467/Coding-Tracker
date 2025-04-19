import axios from "axios";

const fetchLeetCodeStats = async (username) => {
  try {
    const query = `
      query {
        userContestRanking(username: "${username}") {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage    
        }
        userContestRankingHistory(username: "${username}") {
          attended
          trendDirection
          problemsSolved
          totalProblems
          finishTimeInSeconds
          rating
          ranking
          contest {
            title
            startTime
          }
        }
        matchedUser(username: "${username}") {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `;

    const response = await axios.post("https://leetcode.com/graphql", {
      query
    }, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = response.data?.data;

    if (!data || !data.userContestRanking) {
      console.error("No contest data found for user:", username);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error fetching LeetCode contest stats:", err.message);
    return null;
  }
};

export { fetchLeetCodeStats };