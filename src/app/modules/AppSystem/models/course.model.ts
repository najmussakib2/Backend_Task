import { Schema, model } from 'mongoose';
import { TCourse, TEnrollment } from '../typeInterfaces/course.interface';

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId, ref: "User",
    required: true,
  },
  thumbnail: {
    type: String,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  views: {
    type: Number,
  },
},{timestamps:true});

export const Course = model<TCourse>('Course', courseSchema);

const courseEnrollmentSchema = new Schema<TEnrollment>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: {
    completedTopics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    lastAccessed: {
      lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson' },
      topicId: { type: Schema.Types.ObjectId, ref: 'Topic' },
    },
  },
},{timestamps:true});

export const CourseEnroll = model<TEnrollment>('CourseEnroll', courseEnrollmentSchema);
