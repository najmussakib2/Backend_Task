import express from 'express';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { USER_ROLE } from '../../User/user.constant';
import { EnrollControllers } from '../controllers/enrollment.controller';
import { CourseValidations } from '../validations/course.validation';

const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.student,
  ),
  EnrollControllers.getUsersEnrollments,
);

router.put(
  '/progress/:id',
  auth(USER_ROLE.student),
  validateRequest(CourseValidations.updateProgressValidationSchema),
  EnrollControllers.updateProgress,
);

export const EnrollRoutes = router;
