import express from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLE } from '../../User/user.constant';
import { TeacherControllers } from '../controllers/teacher.controller';

const router = express.Router();

router.post(
  '/follow/:teacherId',
  auth(USER_ROLE.student),
  TeacherControllers.followATeacher,
);

router.get(
  '/stats',
  auth(
    USER_ROLE.teacher,
  ),
  TeacherControllers.getTeacherStats,
);

export const TeacherRoutes = router;
