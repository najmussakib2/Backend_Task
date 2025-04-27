import express from 'express';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { USER_ROLE } from '../../User/user.constant';
import { LessonControllers } from '../controllers/lesson.controller';
import { LessonValidations } from '../validations/lesson.validation';

const router = express.Router();

router.post(
  '/add-topic',
  auth(USER_ROLE.teacher),
  validateRequest(LessonValidations.createTopicValidationSchema),
  LessonControllers.addTopicToLesson,
);

router.put(
  '/:id',
  auth(USER_ROLE.teacher),
  validateRequest(LessonValidations.updateLessonValidationSchema),
  LessonControllers.updateLesson,
);

router.delete(
  '/:id',
  auth(USER_ROLE.teacher),
  LessonControllers.deleteLesson,
);


export const LessonRoutes = router;
