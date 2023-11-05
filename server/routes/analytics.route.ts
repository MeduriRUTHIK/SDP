import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getCoursesAnalytics, getOrdersAnalytics, getUserAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get('/get-users-analytics', isAutheticated, authorizeRoles('admin'), getUserAnalytics);
analyticsRouter.get('/get-orders-analytics', isAutheticated, authorizeRoles('admin'), getOrdersAnalytics);
analyticsRouter.get('/get-courses-analytics', isAutheticated, authorizeRoles('admin'), getCoursesAnalytics);



export default analyticsRouter;