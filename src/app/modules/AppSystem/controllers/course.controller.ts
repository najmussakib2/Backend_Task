import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { CourseServices } from '../services/course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const likeCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.likeCourseIntoDB(id, req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=


const addLessonInCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.addLessonInCourseIntoDB(req.body, req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson added successfully',
    data: result,
  });
});


const enrollToCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.enrollToCourseIntoDB(req.user.userId, courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Congratulations! You've joined the course.!",
    data: result,
  });
});


const addFeedback = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.addFeedbackInCourseIntoDB(req.user.userId, courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback added successfully',
    data: result,
  });
});


const getCourseFeedback = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getCourseFeedbackFromDB(courseId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Feedback retrieved successfully',
    data: result,
  });
});

const getSpecificTeachersCourses = catchAsync(async (req, res) => {
  
  const { teacherId } = req.params;

  const result = await CourseServices.getSpecificTeachersCoursesFromDB(teacherId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});



export const CourseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  likeCourse,
  updateCourse,
  deleteCourse,
  addLessonInCourse,
  enrollToCourse,
  addFeedback,
  getCourseFeedback,
  getSpecificTeachersCourses
};
