
import { z } from 'zod';
import { quizQuestionZodSchema } from './lesson.validation';

const updateTopicValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).trim().optional(),

    lessonId: z.string({
      required_error: 'Lesson ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Lesson ObjectId' }).optional(),

    type: z.enum(['content', 'quiz'], {
      required_error: 'Type must be either content or quiz',
    }).optional(),

    content: z.string().optional(),

    quizQuestions: z.array(quizQuestionZodSchema).optional(),

    order: z.number().optional(),
  })
});

export const TopicValidations = {
  updateTopicValidationSchema,
};
