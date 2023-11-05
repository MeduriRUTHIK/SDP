import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutBYType } from "../controllers/layout.controller";
import { updateAccessoken } from "../controllers/user.controller";
const layoutRouter = express.Router();


layoutRouter.post("/create-layout",updateAccessoken, isAutheticated, authorizeRoles("admin"), createLayout);
layoutRouter.post('/edit-layout',updateAccessoken, isAutheticated, authorizeRoles('admin'), editLayout);
layoutRouter.get('/get-layout', getLayoutBYType);

export default layoutRouter;