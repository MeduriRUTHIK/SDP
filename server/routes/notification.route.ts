import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getNotifications, updateNotification } from "../controllers/notification.controller";
import { updateAccessoken } from "../controllers/user.controller";
const notificationRoute = express.Router();

notificationRoute.get('/get-all-notifications', updateAccessoken,isAutheticated, authorizeRoles('admin'), getNotifications);
notificationRoute.get('/update-notification/:id',updateAccessoken, isAutheticated, authorizeRoles('admin'), updateNotification);

export default notificationRoute;