import { RequestHandler } from "express";
import User from "../models/User.js";
import hashText from "../utils/hashText.js";
import { encrypt } from "../utils/encryptDecrypt.js";

export const handleSignUp: RequestHandler = async (req, res) => {
    try {
        const isJSONBody = req.is("application/json");

        if (!isJSONBody) return res.status(403).json({ status: "failed", message: "Invalid request body." });

        const { email, fullname, password } = req.body;

        if (
            !email ||
            typeof email !== "string" ||
            !password ||
            typeof password !== "string" ||
            !fullname ||
            typeof fullname !== "string"
        )
            return res.status(400).json({ status: "failed", message: "Missing or invalid fields in request body." });

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(409).json({ status: "failed", message: "Email already in use." });

        await User.create({ email, fullname, password: hashText(password) });
        res.status(201).json({ status: "success", message: "User created successfully." });
    } catch (error: any) {
        console.error("Failed to register new user", error);
        res.status(500).json({ status: "failed", message: "An unexpected error occurred." });
    }
};

export const handleLogin: RequestHandler = async (req, res) => {
    try {
        const isJSONBody = req.is("application/json");

        if (!isJSONBody) return res.status(403).json({ status: "failed", message: "Invalid request body." });

        const { email, password } = req.body;

        if (!email || typeof email !== "string" || !password || typeof password !== "string")
            return res.status(400).json({ status: "failed", message: "Missing or invalid fields in request body." });

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ status: "failed", message: "No account was found for this email." });

        if (!hashText.verify(password, user.password))
            return res.status(401).json({ status: "failed", message: "Incorrect password." });

        const authToken = encrypt(JSON.stringify({ email, expires: new Date(Date.now() + 3_600_000) }));

        res.cookie("auth", authToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 3_600_000) // 1 hour
        });
        res.json({ status: "success", message: "Signed in successfully" });
    } catch (error: any) {
        console.error("Failed to register new user", error);
        res.status(500).json({ status: "failed", message: "An unexpected error occurred." });
    }
};
