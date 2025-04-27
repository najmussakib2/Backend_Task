import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";
import { CourseEnroll } from "../models/course.model";
import { TEnrollment } from "../typeInterfaces/course.interface";


const getUsersEnrollmentsFromDB = async (userId: string, query: Record<string, unknown>) => {

    const CourseQuery = new QueryBuilder(CourseEnroll.find({ studentId: userId })
        .populate({
            path: 'courseId',
            select: 'title description thumbnail'
        })
        .populate({
            path: 'progress.lastAccessed.lessonId',
            select: 'title'
        })
        .populate({
            path: 'progress.lastAccessed.topicId',
            select: 'title'
        }), query)
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();

    if (!CourseQuery) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to load Feedback!');
    }
    const result = await CourseQuery.modelQuery;

    return result

};

const updateProgressIntoDB = async (_id: string, payload: Partial<TEnrollment>) => {
    try {
      const result = await CourseEnroll.findOneAndUpdate(
        {courseId: _id},
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

export const EnrollServices = {
    getUsersEnrollmentsFromDB,
    updateProgressIntoDB
}