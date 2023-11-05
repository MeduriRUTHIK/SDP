import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAllCourses, getCoursesByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { updateAccessoken } from "../controllers/user.controller";
const courseRouter = express.Router();

courseRouter.post('/create-course',updateAccessoken, isAutheticated, authorizeRoles('admin'), uploadCourse);
courseRouter.put('/edit-course/:id',updateAccessoken, isAutheticated, authorizeRoles('admin'), editCourse);
courseRouter.get('/get-course/:id', getSingleCourse);
courseRouter.get('/get-courses', getAllCourses);
courseRouter.get('/get-course-content/:id',updateAccessoken, isAutheticated, getCoursesByUser);
courseRouter.put('/add-question',updateAccessoken, isAutheticated, addQuestion);
courseRouter.put('/add-answer',updateAccessoken, isAutheticated, addAnswer);
courseRouter.put('/add-review/:id',updateAccessoken, isAutheticated, addReview);
courseRouter.put('/add-reply',updateAccessoken, isAutheticated, authorizeRoles('admin'), addReplyToReview);
courseRouter.get('/get-courses',updateAccessoken, isAutheticated, authorizeRoles('admin'), getAllCourses);
courseRouter.post('/getVdoCipherOTP',generateVideoUrl);
courseRouter.delete('/delete-course/:id', updateAccessoken,isAutheticated, authorizeRoles("admin"), deleteCourse);

export default courseRouter;