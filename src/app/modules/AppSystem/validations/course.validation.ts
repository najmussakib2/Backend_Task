import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }).trim(),

    description: z.string({
      required_error: 'description is required',
    }).trim(),

    teacher: z.string({
      required_error: 'Teacher ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid teacher ObjectId' }).optional(), // MongoDB ObjectId check

    thumbnail: z.string().optional(),

    likes: z.array(
      z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid user ObjectId in likes' })
    ).optional(),

    views: z.number().optional(),
  })
});

const addLessonInCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }).trim(),

    courseId: z.string({
      required_error: 'Course ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Course ObjectId' }),

    description: z.string({
      required_error: 'Description is required',
    }).trim(),

    order: z.number().optional(),
  })
});

const updateCourseValidationSchema = z.object({
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

const enrollCourseValidationSchema = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Student ObjectId' }),

    courseId: z.string({
      required_error: 'Course ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Course ObjectId' }),

    progress: z.object({
      completedTopics: z.array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Topic ObjectId in completedTopics' })
      ).optional(),

      lastAccessed: z.object({
        lessonId: z.string()
          .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Lesson ObjectId' })
          .optional(),

        topicId: z.string()
          .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Topic ObjectId' })
          .optional(),
      }).optional(),
    }).optional(),
  })
});

const addFeedbackValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      required_error: 'Course ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Course ObjectId' }).optional(),

    studentId: z.string({
      required_error: 'Student ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Student ObjectId' }).optional(),

    rating: z.number({
      required_error: 'Rating is required',
    }).min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating cannot be more than 5' }),

    comment: z.string().optional(),
  })
});

const updateProgressValidationSchema = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Student ObjectId' }).optional(),

    courseId: z.string({
      required_error: 'Course ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Course ObjectId' }).optional(),

    progress: z.object({
      completedTopics: z.array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Topic ObjectId in completedTopics' })
      ).optional(),

      lastAccessed: z.object({
        lessonId: z.string()
          .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Lesson ObjectId' })
          .optional(),

        topicId: z.string()
          .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Topic ObjectId' })
          .optional(),
      }).optional(),
    }).optional(),
  })
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  addLessonInCourseValidationSchema,
  enrollCourseValidationSchema,
  addFeedbackValidationSchema,
  updateProgressValidationSchema
};
