import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import { TeacherServices } from "../services/teacher.service";


const followATeacher = catchAsync(async (req, res) => {

  const { teacherId } = req.params;
  const result = await TeacherServices.followATeacherFromDB(teacherId, req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Following successful. Get ready to learn from the best!',
    data: result,
  });
});


const getTeacherStats = catchAsync(async (req, res) => {
  const result = await TeacherServices.getTeacherStatsFromDB(req.user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stats are retrieved successfully',
    data: result,
  });
});

export const TeacherControllers = {
  followATeacher,
  getTeacherStats
  };