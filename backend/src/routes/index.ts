import { Router } from "express";
import userRoutes from "./user-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes); //domain/api/v1/user

export default appRouter;
