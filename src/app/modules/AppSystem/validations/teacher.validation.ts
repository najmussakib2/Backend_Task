import { z } from 'zod';


const followATeacherValidationSchema = z.object({
  body: z.object({
  studentId: z.string({
    required_error: 'Student ID is required',
  }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Student ObjectId' }),

  teacherId: z.string({
    required_error: 'Teacher ID is required',
  }).regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Teacher ObjectId' }),

  followedAt: z.date().optional(), // default is set in DB, so optional here

})
});



export const TeacherValidations = {
  followATeacherValidationSchema
};
