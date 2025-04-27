import { Schema, model } from 'mongoose';
import { TLesson } from '../typeInterfaces/course.interface';

const lessonSchema = new Schema<TLesson>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },

  courseId: {
    type: Schema.Types.ObjectId, ref: "Course",
    required: true,
  },

  description: {
    type: String,
    trim: true,
    required: true,
  },

  order: {
    type: Number,
  },
},{timestamps:true});

export const Lesson = model<TLesson>('Lesson', lessonSchema);

