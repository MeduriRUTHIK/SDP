import express from "express";
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessoken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login-user', loginUser);
userRouter.get('/logout', updateAccessoken,isAutheticated, logoutUser);
userRouter.get('/refresh', updateAccessoken);
userRouter.get('/me',updateAccessoken, isAutheticated, getUserInfo);
userRouter.post('/socialAuth', socialAuth);
userRouter.put('/update-user-info',updateAccessoken, isAutheticated, updateUserInfo);
userRouter.put('/update-user-password',updateAccessoken, isAutheticated, updatePassword);
userRouter.put('/update-user-avatar',updateAccessoken, isAutheticated, updateProfilePicture);
userRouter.get('/get-users',updateAccessoken, isAutheticated, authorizeRoles('admin'), getAllUsers);
userRouter.put('/update-user',updateAccessoken, isAutheticated, authorizeRoles('admin'), updateUserRole);
userRouter.delete('/delete-user/:id',updateAccessoken, isAutheticated, authorizeRoles('admin'), deleteUser);

export default userRouter;