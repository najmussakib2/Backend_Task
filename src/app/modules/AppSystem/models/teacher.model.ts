import { Schema, model } from 'mongoose';
import { TFeedback, TTeacherFollowing } from '../typeInterfaces/course.interface';


const FeedbackSchema = new Schema<TFeedback>({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
},{timestamps:true});

export const Feedback = model<TFeedback>('Feedback', FeedbackSchema);


const TeacherFollowingSchema = new Schema<TTeacherFollowing>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  followedAt: { type: Date, required: true, default: Date.now },
},{timestamps:true});

export const TeacherFollowing = model<TTeacherFollowing>('TeacherFollowing', TeacherFollowingSchema);

