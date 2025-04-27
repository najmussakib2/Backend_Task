import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CourseRoutes } from '../modules/AppSystem/routes/course.route';
import { UserRoutes } from '../modules/User/user.route';
import { TeacherRoutes } from '../modules/AppSystem/routes/teacher.route';
import { EnrollRoutes } from '../modules/AppSystem/routes/enrollment.route';
import { LessonRoutes } from '../modules/AppSystem/routes/lesson.route';
import { TopicRoutes } from '../modules/AppSystem/routes/topic.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  
  //AppSystem routes
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/teachers',
    route: TeacherRoutes,
  },
  {
    path: '/enrollments',
    route: EnrollRoutes,
  },
  {
    path: '/lessons',
    route: LessonRoutes,
  },
  {
    path: '/topics',
    route: TopicRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
