import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { LessonServices } from '../services/lesson.service';

const addTopicToLesson = catchAsync(async (req, res) => {
  const result = await LessonServices.addTopicToLessonIntoDB( req.body, req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Topic added successfully',
    data: result,
  });
});


const updateLesson = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LessonServices.updateLessonIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson is updated successfully',
    data: result,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LessonServices.deleteLessonFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson is deleted successfully',
    data: result,
  });
});


export const LessonControllers = {
  addTopicToLesson,
  updateLesson,
  deleteLesson
};
