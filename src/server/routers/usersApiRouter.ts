import { Router } from "express";
import { getUser, handlePostCreation } from "../controllers/user.controller.js";
import authorize from "../middleware/authorize.js";

const usersApiRouter = Router();

usersApiRouter.use(authorize);
usersApiRouter.get("/", <any>getUser);
usersApiRouter.post("/posts/create", <any>handlePostCreation);

export default usersApiRouter;
