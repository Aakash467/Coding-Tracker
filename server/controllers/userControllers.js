import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 🚀 Register a new user
export const registerUser = async (req, res) => {
    try {
        let { username, email, password, leetcodeUsername, codeforcesUsername, codechefUsername, gfgUsername } = req.body;

        // Trim all inputs
        username = username?.trim();
        email = email?.trim();
        password = password?.trim();
        leetcodeUsername = leetcodeUsername?.trim();
        codeforcesUsername = codeforcesUsername?.trim();
        codechefUsername = codechefUsername?.trim();
        gfgUsername = gfgUsername?.trim();

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ message: 'Password must be a string with at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the TRIMMED password
        //const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with trimmed data
        const newUser = new User({
            username,
            email,
            password,
            leetcodeUsername,
            codeforcesUsername,
            codechefUsername,
            gfgUsername,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 🚀 Login User
export const loginUser = async (req, res) => {
    try {
        let { email: rawEmail, password: rawPassword } = req.body;
        
        // Trim inputs
        const email = rawEmail?.trim();
        const password = rawPassword?.trim();

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }); // Use trimmed email to find user
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Verify password (compare TRIMMED password with stored hash)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Input password:', password);
        console.log('Stored hash:', user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                leetcodeUsername: user.leetcodeUsername,
                codeforcesUsername: user.codeforcesUsername,
                codechefUsername: user.codechefUsername,
                gfgUsername: user.gfgUsername
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 🚀 Update User's Coding Platform Usernames
export const updateUserCodingProfiles = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });
    
        const { leetcode, codeforces, codechef, gfg } = req.body;
    
        user.leetcodeUsername = leetcode || user.leetcodeUsername;
        user.codeforcesUsername = codeforces || user.codeforcesUsername;
        user.codechefUsername = codechef || user.codechefUsername;
        user.gfgUsername = gfg || user.gfgUsername;
    
        await user.save();
        res.status(200).json({ message: "Coding profile usernames updated successfully" });
      } catch (error) {
        console.error("Error updating user profiles:", error.message);
        res.status(500).json({ error: "Server error" });
      }
};