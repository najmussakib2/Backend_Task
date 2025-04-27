import { Types } from "mongoose";
import {  TeacherFollowing } from "../models/teacher.model";
import AppError from "../../../errors/AppError";
import httpStatus from "http-status";
import { getTeacherStats } from "../constans/teacher.const";


const followATeacherFromDB = async (teacherId: string, studentId: Types.ObjectId) => {

  const result = await TeacherFollowing.create({studentId, teacherId });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Follow');
  }
  return result;
};

const getTeacherStatsFromDB = async (teacherId: string) => {

  try {
    const stats = await getTeacherStats(teacherId);
    return stats
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get states!');
  }
  
};



export const TeacherServices = {
  followATeacherFromDB,
  getTeacherStatsFromDB
};