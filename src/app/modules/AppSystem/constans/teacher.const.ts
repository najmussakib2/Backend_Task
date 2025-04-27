// src/services/teacher.service.ts

import type { Types } from 'mongoose';
import { TCourse, TFeedback } from '../typeInterfaces/course.interface';
import { Course, CourseEnroll } from '../models/course.model';
import { Feedback } from '../models/teacher.model';
import { Lesson } from '../models/lesson.model';
import { Topic } from '../models/topic.model';

interface CompletionRate {
  courseId: Types.ObjectId;
  courseTitle: string;
  completionRate: number;
}

interface TeacherStats {
  summary: {
    totalCourses: number;
    totalEnrollments: number;
    averageRating: number;
    totalReviews: number;
  };
  completionRates: CompletionRate[];
  recentFeedback: TFeedback[]; // Replace with proper interface
  engagement: {
    activeStudents: number;
  };
}

export const getTeacherStats = async (teacherId: string): Promise<TeacherStats> => {
  const courseIds = await getTeacherCourseIds(teacherId);
  
  const [
    totalCourses,
    totalEnrollments,
    ratingData,
    completionRates,
    recentFeedback,
    activeStudents
  ] = await Promise.all([
    getTotalCourses(teacherId),
    getTotalEnrollments(courseIds),
    getRatingData(courseIds),
    getCompletionRates(teacherId, courseIds),
    getRecentFeedback(courseIds),
    getActiveStudents(courseIds)
  ]);

  return {
    summary: {
      totalCourses,
      totalEnrollments,
      averageRating: ratingData.averageRating,
      totalReviews: ratingData.totalReviews
    },
    completionRates,
    recentFeedback,
    engagement: { activeStudents }
  };
};

// Helper functions
const getTeacherCourseIds = async (teacherId: string): Promise<Types.ObjectId[]> => {
  return Course.find({ teacher: teacherId }).distinct('_id');
};

const getTotalCourses = async (teacherId: string): Promise<number> => {
  return Course.countDocuments({ teacher: teacherId });
};

const getTotalEnrollments = async (courseIds: Types.ObjectId[]): Promise<number> => {
  return CourseEnroll.countDocuments({ courseId: { $in: courseIds } });
};

const getRatingData = async (courseIds: Types.ObjectId[]): Promise<{ averageRating: number; totalReviews: number }> => {
  const result = await Feedback.aggregate([
    { $match: { courseId: { $in: courseIds } } },
    { 
      $group: { 
        _id: null, 
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 }
      } 
    }
  ]);
  
  return {
    averageRating: parseFloat((result[0]?.averageRating || 0).toFixed(1)),
    totalReviews: result[0]?.totalReviews || 0
  };
};

const getCompletionRates = async (teacherId: string, courseIds: Types.ObjectId[]): Promise<CompletionRate[]> => {
  const courses = await Course.find({ _id: { $in: courseIds } }).select('title');
  
  return Promise.all(courses.map(async (course: TCourse) => {
    const lessonIds = await Lesson.find({ courseId: course._id }).distinct('_id');
    const totalTopics = await Topic.countDocuments({ lessonId: { $in: lessonIds } });
    
    const enrollments = await CourseEnroll.find({ courseId: course._id })
      .select('progress.completedTopics');
    
    const avgCompleted = enrollments.reduce(
      (sum, e) => sum + e.progress.completedTopics.length, 0
    ) / (enrollments.length || 1);

    return {
      courseId: course._id,
      courseTitle: course.title,
      completionRate: totalTopics > 0 
        ? Math.round((avgCompleted / totalTopics) * 100)
        : 0
    };
  }));
};

const getRecentFeedback = async (courseIds: Types.ObjectId[]): Promise<TFeedback[]> => {
  return Feedback.find({ courseId: { $in: courseIds } })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('courseId', 'title')
    .populate('studentId', 'name avatar');
};

const getActiveStudents = async (courseIds: Types.ObjectId[]): Promise<number> => {
  return CourseEnroll.distinct('studentId', {
    courseId: { $in: courseIds },
    updatedAt: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  }).countDocuments();
};