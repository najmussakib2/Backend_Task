import { Types } from 'mongoose';

export type TCourse = {
  _id: Types.ObjectId,
  title: string;
  description: string;
  teacher: Types.ObjectId; // Reference to User
  likes: Types.ObjectId[]; // Reference to User
  views: number;
  thumbnail?: string;
  category: string;
  isPublished: boolean;
};

export type TLesson = {
  courseId: Types.ObjectId; // Reference to Course
  title: string;
  description: string;
  order: number;
};

export type TTopic = {
  lessonId: Types.ObjectId; // Reference to Lesson
  type: 'content' | 'quiz';
  title: string;
  content?: string; // For content type
  quizQuestions?: TQuizQuestion[]; // For quiz type
  order: number;
}

export type TQuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

export type TEnrollment = {
  studentId: Types.ObjectId; // Reference to User
  courseId: Types.ObjectId; // Reference to Course
  progress: {
    completedTopics: Types.ObjectId[]; // Reference to Topic
    lastAccessed?: {
      lessonId: Types.ObjectId;
      topicId: Types.ObjectId;
    };
  };
}

export type TFeedback = {
  courseId: Types.ObjectId; // Reference to Course
  studentId: Types.ObjectId; // Reference to User
  rating: number; // 1-5
  comment?: string;
}

export type TTeacherFollowing = {
  studentId: Types.ObjectId; // Reference to User
  teacherId: Types.ObjectId; // Reference to User
  followedAt: Date;
}