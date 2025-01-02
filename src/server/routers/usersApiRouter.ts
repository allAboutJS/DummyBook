import { Router } from "express";
import { handlePostCreation } from "../controllers/user.controller.js";
import authorize from "../middleware/authorize.js";

const usersApiRouter = Router();

usersApiRouter.use(authorize);
usersApiRouter.post("/posts/create", handlePostCreation);

export default usersApiRouter;
