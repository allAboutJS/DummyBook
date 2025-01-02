import { RequestHandler } from "express";
import { decrypt } from "../utils/encryptDecrypt.js";
import User from "../models/User.js";

const authorize: RequestHandler = async (req, res, next) => {
    try {
        const authCookie = req.cookies.auth;

        if (!authCookie)
            res.status(401).json({
                status: "failed",
                message: "You are not authorized to use this service."
            });

        const { email, expires } = <{ email: string; expires: Date }>JSON.parse(decrypt(req.cookies.auth));

        if (new Date(Date.now()) > expires)
            return res
                .status(401)
                .json({
                    status: "failed",
                    message: "Your authorization token has expired. You'll have to sign in again."
                });

        const user = await User.findOne({ email });

        if (!user)
            return res
                .status(401)
                .json({ status: "failed", message: "We couldn't find your account. You'll have to create one." });

        (<any>req).user = user;
        next();
    } catch (error) {
        res.status(500).redirect("/login");
    }
};

export default authorize;
