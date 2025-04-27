import express from 'express';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { USER_ROLE } from '../../User/user.constant';
import { TopicValidations } from '../validations/topic.validation';
import { TopicControllers } from '../controllers/topic.controller';

const router = express.Router();

router.put(
  '/:id',
  auth(USER_ROLE.teacher),
  validateRequest(TopicValidations.updateTopicValidationSchema),
  TopicControllers.updateTopic,
);

router.delete(
  '/:id',
  auth(USER_ROLE.teacher),
  TopicControllers.deleteTopic,
);


export const TopicRoutes = router;
