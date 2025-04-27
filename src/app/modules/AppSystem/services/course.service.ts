import httpStatus from 'http-status';
import QueryBuilder from '../../../builder/QueryBuilder';
import AppError from '../../../errors/AppError';
import { TCourse, TFeedback, TLesson } from '../typeInterfaces/course.interface';
import { Course, CourseEnroll } from '../models/course.model';
import { Types } from 'mongoose';
import { Lesson } from '../models/lesson.model';
import { Feedback } from '../models/teacher.model';


const createCourseIntoDB = async (payload: TCourse, userId: string) => {
  payload.teacher = new Types.ObjectId(userId)
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('teacher'),
    query,
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleCourseFromDB = async (_id: string) => {
  const result = await Course.findById(_id).populate('teacher').populate('likes');
  return result;
};

const likeCourseIntoDB = async (_id: string, userId: string) => {
  try {

    //step1: basic course info update
    const result = await Course.findByIdAndUpdate(
      _id,
      {
        $addToSet: { likes: new Types.ObjectId(userId) }, // Prevent duplicates
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to like course');
    }
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to like course');
  }
};

const updateCourseIntoDB = async (_id: string, payload: Partial<TCourse>) => {
  try {

    //step1: basic course info update
    const result = await Course.findByIdAndUpdate(
      _id,
      payload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (_id: string) => {

  const result = await Course.deleteOne({_id})
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete course');
  }

  return result;
};


const addLessonInCourseIntoDB = async ( payload: TLesson, userId: string) => {

  const course = await Course.findById({_id: payload.courseId})
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'course not found!');
  }

  const teacherId = String(course.teacher);

  if(teacherId !== userId){
    throw new AppError(httpStatus.BAD_REQUEST, 'you can only add lessons to your own course !');
  }

  const result = await Lesson.create(payload)

  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create lesson!');
  }

  return result

};

const enrollToCourseIntoDB = async (userId: Types.ObjectId, courseId: string ) => {

  const data = {
    studentId: userId,
    courseId: courseId
  }

  const result = await CourseEnroll.create(data)

  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Enroll!');
  }

  return result

};


const addFeedbackInCourseIntoDB = async (userId: Types.ObjectId, courseId: string, payload:TFeedback ) => {

  payload.courseId = new Types.ObjectId(courseId)
  payload.studentId = userId

  const result = await Feedback.create(payload)

  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to send Feedback!');
  }

  return result

};


const getCourseFeedbackFromDB = async ( courseId: string, query: Record<string, unknown> ) => {

  const FeedQuery = new QueryBuilder(Feedback.find({courseId}), query)
  .search([])
  .filter()
  .sort()
  .paginate()
  .fields();

  if(!FeedQuery){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to load Feedback!');
  }

  const result = await FeedQuery.modelQuery;

  return result

};

const getSpecificTeachersCoursesFromDB = async ( teacherId: string,  query: Record<string, unknown>  ) => {

  const courseQuery = new QueryBuilder(Course.find({teacher: teacherId}), query)
  .search([])
  .filter()
  .sort()
  .paginate()
  .fields();

  if(!courseQuery){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to load courses!');
  }

  const result = await courseQuery.modelQuery;

  return result

};


export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  likeCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  addLessonInCourseIntoDB,
  enrollToCourseIntoDB,
  addFeedbackInCourseIntoDB,
  getCourseFeedbackFromDB,
  getSpecificTeachersCoursesFromDB
};
