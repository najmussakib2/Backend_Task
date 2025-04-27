import { z } from 'zod';

export const quizQuestionZodSchema = z.object({
  question: z.string({
    required_error: 'Question is required',
  }),

  options: z.array(
    z.string({
      required_error: 'Option must be a string',
    })
  ).min(1, { message: 'At least one option is required' }),

  correctAnswer: z.number({
    required_error: 'Correct answer index is required',
  }),
});

const createTopicValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).trim(),

    lessonId: z.string({
      required_error: 'Lesson ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Lesson ObjectId' }),

    type: z.enum(['content', 'quiz'], {
      required_error: 'Type must be either content or quiz',
    }),

    content: z.string().optional(),

    quizQuestions: z.array(quizQuestionZodSchema).optional(),

    order: z.number().optional(),
  })
});

const updateLessonValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).trim().optional(),

    courseId: z.string({
      required_error: 'Course ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Course ObjectId' }).optional(),

    description: z.string({
      required_error: 'Description is required',
    }).trim().optional(),

    order: z.number().optional(),
  })
});



export const LessonValidations = {
  createTopicValidationSchema,
  updateLessonValidationSchema

};
