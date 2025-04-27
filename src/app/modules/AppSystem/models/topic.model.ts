import { Schema, model } from 'mongoose';
import { TQuizQuestion, TTopic } from '../typeInterfaces/course.interface';


const QuizQuestionSchema = new Schema<TQuizQuestion>({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
},{timestamps:true});

export const QuizQuestion = model<TQuizQuestion>('QuizQuestion', QuizQuestionSchema);


const topicSchema = new Schema<TTopic>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },

  lessonId: {
    type: Schema.Types.ObjectId, ref: "Course",
    required: true,
  },

  type: {
    type: String,
    enum: ['content', 'quiz'],
    required: true,
  },
  content: {
    type: String,
  },
  quizQuestions: { type: [QuizQuestionSchema] },
  order: {
    type: Number,
  },
},{timestamps:true});

export const Topic = model<TTopic>('Topic', topicSchema);
