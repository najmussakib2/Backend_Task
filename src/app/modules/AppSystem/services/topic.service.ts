import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { Topic } from '../models/topic.model';
import { TTopic } from '../typeInterfaces/course.interface';


const updateTopicIntoDB = async (_id: string, payload: Partial<TTopic>) => {
  try {

    //step1: basic course info update
    const result = await Topic.findByIdAndUpdate(
      _id,
      payload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Topic');
    }
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Topic');
  }
};

const deleteTopicFromDB = async (_id: string) => {

  const result = await Topic.deleteOne({_id})
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Topic');
  }

  return result;
};



export const TopicServices = {
  updateTopicIntoDB,
  deleteTopicFromDB
};
