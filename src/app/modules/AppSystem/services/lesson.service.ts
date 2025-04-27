import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { Lesson } from '../models/lesson.model';
import { TLesson, TTopic } from '../typeInterfaces/course.interface';
import { Course } from '../models/course.model';
import { Topic } from '../models/topic.model';

const addTopicToLessonIntoDB = async ( payload: Partial<TTopic>, userId: string) => {

  const lesson = await Lesson.findById({_id: payload.lessonId})
  if (!lesson) {
    throw new AppError(httpStatus.NOT_FOUND, 'lesson not found!');
  }

  const course = await Course.findOne({_id: lesson.courseId})

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'course not found!');
  }

  const teacherId = course.teacher.toString()

  if(teacherId !== userId){
    throw new AppError(httpStatus.BAD_REQUEST, 'you can only add Topics to your own course lessons !');
  }

  payload.lessonId = lesson._id

  const result = await Topic.create(payload)

  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create lesson!');
  }

  return result

};


const updateLessonIntoDB = async (_id: string, payload: Partial<TLesson>) => {
  try {

    //step1: basic Lesson info update
    const result = await Lesson.findByIdAndUpdate(
      _id,
      payload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Lesson');
    }
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Lesson');
  }
};

const deleteLessonFromDB = async (_id: string) => {

  const result = await Lesson.deleteOne({_id})
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Lesson');
  }

  return result;
};
export const LessonServices = {
  addTopicToLessonIntoDB,
  updateLessonIntoDB,
  deleteLessonFromDB
};
