import { RequestHandler } from "express";
import User from "../models/User.js";
import hashText from "../utils/hashText.js";
import { encrypt } from "../utils/encryptDecrypt.js";

export const handleSignUp: RequestHandler = async (req, res) => {
    if (!req.is("application/json"))
        return res.status(403).json({ status: "failed", message: "Invalid request body." });

    try {
        await User.create({ ...req.body, password: hashText(req.body.password) });
        res.status(201).json({ status: "success", message: "User created successfully." });
    } catch {
        res.status(500).json({ status: "failed", message: "An unexpected error occurred." });
    }
};

export const handleLogin: RequestHandler = async (req, res) => {
    if (!req.is("application/json"))
        return res.status(403).json({ status: "failed", message: "Invalid request body." });

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        let authToken: string, tokenExpiryDate: Date;

        if (!user) return res.status(404).json({ status: "failed", message: "No account was found for this email." });

        if (!hashText.verify(password, user.password))
            return res.status(401).json({ status: "failed", message: "Incorrect password." });

        authToken = encrypt(JSON.stringify({ email, expires: new Date(Date.now() + 3_600_000) }));
        tokenExpiryDate = new Date(Date.now() + 3_600_000); // 1 hour
        res.cookie("auth", authToken, { httpOnly: true, secure: true, expires: tokenExpiryDate });
        res.json({ status: "success", data: { ...user.toJSON(), password: undefined } });
    } catch {
        res.status(500).json({ status: "failed", message: "An unexpected error occurred." });
    }
};
