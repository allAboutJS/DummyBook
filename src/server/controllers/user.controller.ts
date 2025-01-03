import { Request, Response } from "express";
import formidable from "formidable";
import axios from "axios";
import FormData from "form-data";
import Post from "../models/Post.js";
import { createReadStream } from "fs";
import UserDocument from "../@types/User.js";
import parseFields from "../utils/parseFormidableFields.js";

export const handlePostCreation = async (req: Request & { user: UserDocument }, res: Response) => {
    try {
        const form = formidable();
        let [fields, files] = await form.parse(req);
        fields = parseFields(fields);

        if (fields) {
            const { avatarImageUrl, fullname, id } = req.user;
            const { postType, text, styling } = fields;
            let images = [];

            if (files.images && <unknown>postType === "text_and_image") {
                for (let image of files.images) {
                    const form = new FormData();

                    form.append("key", process.env.IMGBB_API_KEY);
                    form.append("image", createReadStream(image.filepath));

                    const response = await axios.post("https://api.imgbb.com/1/upload", form, {
                        headers: {
                            ...form.getHeaders()
                        }
                    });

                    images.push(response.data.data.url);
                }
            }

            await Post.create({
                author: { fullname, id, avatarImageUrl },
                type: postType,
                styling,
                data: {
                    text,
                    images: <unknown>postType === "text_and_image" ? images : undefined
                }
            });

            res.sendStatus(201);
        } else res.sendStatus(503);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const getUser = async (req: Request & { user: UserDocument }, res: Response) => res.json(req.user.toJSON);
