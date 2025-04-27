import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { EnrollServices } from "../services/enrollment.service";

const getUsersEnrollments = catchAsync(async (req, res) => {
    const result = await EnrollServices.getUsersEnrollmentsFromDB(req.user.userId, req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course are retrieved successfully',
        data: result,
    });
});

const updateProgress = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EnrollServices.updateProgressIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'course is updated successfully',
        data: result,
    });
});


export const EnrollControllers = {
    getUsersEnrollments,
    updateProgress
};