import express from 'express';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { USER_ROLE } from '../../User/user.constant';
import { CourseControllers } from '../controllers/course.controller';
import { CourseValidations } from '../validations/course.validation';

const router = express.Router();

router.post(
  '/',
  auth(
    USER_ROLE.teacher,
  ),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.post(
  '/add-lesson',
  auth(
    USER_ROLE.teacher,
  ),
  validateRequest(CourseValidations.addLessonInCourseValidationSchema),
  CourseControllers.addLessonInCourse,
);

router.post(
  '/enroll/:courseId',
  auth(
    USER_ROLE.student,
  ),
  CourseControllers.enrollToCourse,
);

router.post(
  '/feedback/:courseId',
  auth(
    USER_ROLE.student,
  ),
  validateRequest(CourseValidations.addFeedbackValidationSchema),
  CourseControllers.addFeedback,
);

router.get(
  '/feedback/:courseId',
  auth(
    USER_ROLE.teacher,
    USER_ROLE.student,
  ),
  CourseControllers.getCourseFeedback,
);

router.get(
  '/',
  auth(
    USER_ROLE.teacher,
    USER_ROLE.student,
  ),
  CourseControllers.getAllCourses,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.teacher,
    USER_ROLE.student,
  ),
  CourseControllers.getSingleCourse,
);

router.get(
  '/teacher/:teacherId',
  auth(
    USER_ROLE.teacher,
    USER_ROLE.student,
  ),
  CourseControllers.getSpecificTeachersCourses,
);


router.put(
  '/like/:id',
  auth(USER_ROLE.teacher, USER_ROLE.student),
  CourseControllers.likeCourse,
);

router.put(
  '/:id',
  auth(USER_ROLE.teacher),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.teacher),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = router;