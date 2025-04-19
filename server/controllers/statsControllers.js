import User from '../models/User.js';
import { fetchLeetCodeStats } from "../services/leetcodeService.js";
import { fetchCodeChefStats } from "../services/codechefService.js";
import { fetchCodeForcesStats } from "../services/codeforcesService.js";
import { Scrap } from "../services/gfgService.js";  // Update the import to use Scrap class

const getCodingStats = async (req, res) => {
    try {
        // Fetch user details from MongoDB
        console.log(req.user.id);
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Extract platform usernames from DB
        const { leetcodeUsername, codechefUsername, codeforcesUsername, gfgUsername } = user;
        console.log(leetcodeUsername, codechefUsername, codeforcesUsername, gfgUsername);

        // Function to safely fetch stats
        const fetchWithCatch = async (fn, username) => {
            try {
                return username ? await fn(username) : null;
            } catch (err) {
                console.error(`Error fetching stats from ${fn.name}:`, err);
                return null;
            }
        };

        console.log("Fetching stats for:", {
            leetcodeUsername,
            codechefUsername,
            codeforcesUsername,
            gfgUsername,
        });

        // Fetch coding stats, replace fetchGFGStats with Scrap class
        const [leetcode, codechef, codeforces, gfg] = await Promise.all([
            fetchWithCatch(fetchLeetCodeStats, leetcodeUsername),
            fetchWithCatch(fetchCodeChefStats, codechefUsername),
            fetchWithCatch(fetchCodeForcesStats, codeforcesUsername),
            gfgUsername ? await new Scrap(gfgUsername).fetchResponse() : null,  // Use Scrap class for GFG stats
        ]);

        res.json({ leetcode, codechef, codeforces, gfg });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};

// Corrected export
export { getCodingStats };