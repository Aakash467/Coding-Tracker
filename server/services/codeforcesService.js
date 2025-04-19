import axios from "axios";

const fetchCodeForcesStats = async (username) => {
    try {
        const userRes = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
        const user = userRes.data.result[0];

        const submissionRes = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
        const submissions = submissionRes.data.result;

        const solvedSet = new Set();
        for (const sub of submissions) {
            if (sub.verdict === "OK") {
                solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
        }

        return {
            ...user,
            problemsSolved: solvedSet.size,
        };
    } catch (err) {
        console.error("Error fetching CodeForces stats:", err);
        return null;
    }
};

export { fetchCodeForcesStats };