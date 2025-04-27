import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { TopicServices } from '../services/topic.service';



const updateTopic = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TopicServices.updateTopicIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Topic is updated successfully',
    data: result,
  });
});

const deleteTopic = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TopicServices.deleteTopicFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Topic is deleted successfully',
    data: result,
  });
});

export const TopicControllers = {
  deleteTopic,
  updateTopic
};
