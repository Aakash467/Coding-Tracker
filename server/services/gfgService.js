import axios from "axios";
import * as cheerio from "cheerio";

class Scrap {
  constructor(username) {
    this.username = username;
  }

  async fetchResponse() {
    const BASE_URL = `https://auth.geeksforgeeks.org/user/${this.username}/practice/`;

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    };

    const profilePage = await axios.get(BASE_URL, { headers });

    if (profilePage.status !== 200) return { error: "Profile Not Found" };

    const $ = cheerio.load(profilePage.data);
    //console.log(profilePage.data);

    const script_tag = $('script[id="__NEXT_DATA__"][type="application/json"]');
    if (!script_tag.length) return { error: "Could not find user data" };

    try {
      const user_data = JSON.parse(script_tag.text());
      const user_info = user_data.props.pageProps.userInfo;
      const user_submissions = user_data.props.pageProps.userSubmissionsInfo;

      const generalInfo = {
        userName: this.username,
        fullName: user_info.name || "",
        profilePicture: user_info.profile_image_url || "",
        institute: user_info.institute_name || "",
        instituteRank: user_info.institute_rank || "",
        currentStreak: user_info.pod_solved_longest_streak || "00",
        maxStreak: user_info.pod_solved_global_longest_streak || "00",
        codingScore: user_info.score || 0,
        monthlyScore: user_info.monthly_score || 0,
        totalProblemsSolved: user_info.total_problems_solved || 0
      };

      const solvedStats = {};
      for (const [difficulty, problems] of Object.entries(user_submissions)) {
        solvedStats[difficulty.toLowerCase()] = {
          count: Object.keys(problems).length,
          questions: Object.values(problems).map(details => ({
            question: details.pname,
            questionUrl: `https://practice.geeksforgeeks.org/problems/${details.slug}`
          }))
        };
      }

      return user_data.props.pageProps;
    } catch (err) {
      console.error("Error parsing user data:", err.message);
      return { error: "Failed to parse user data" };
    }
  }
}

export { Scrap };