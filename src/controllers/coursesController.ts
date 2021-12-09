import { Request, Response } from 'express';
import responseCodes from '../responseCodes';
import coursesService from '../services/coursesService';
import { IUpdateCourse, INewCourse } from '../interfaces/coursesInterface';

const coursesController = {
  getAllCourses: async (req: Request, res: Response) => {
    const courses = await coursesService.getAllCourses();
    return res.status(responseCodes.ok).json({
      courses,
    });
  },
  getCourseById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if ((id === res.locals.course.id) || (res.locals.course.role === 'Admin')) {
      const course = await coursesService.getCourseById(id);
      if (!course) {
        return res.status(responseCodes.badRequest).json({
          error: `No course found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      course,
    });
    }
    return res.status(responseCodes.notAuthorized).json({
      error: 'No permission',
    });
  },
  removeCourse: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const course = await coursesService.getCourseById(id);
    if (!course) {
      return res.status(responseCodes.badRequest).json({
        message: `Course not found with id: ${id}`,
      });
    }
    await coursesService.removeCourse(id);
    return res.status(responseCodes.noContent).json({});
  },
  createCourse: async (req: Request, res: Response) => {
    const { name } = req.body;
    const newCourse: INewCourse = {
      name,
    };
    const id = await coursesService.createCourse(newCourse);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateCourse: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const course = coursesService.getCourseById(id);
    if (!course) {
      return res.status(responseCodes.badRequest).json({
        error: `No course found with id: ${id}`,
      });
    }
    const updateCourse: IUpdateCourse = {
      id,
    };
    if (name) updateCourse.name = name;
    const result = await coursesService.updateCourse(updateCourse);
    if (!result) {
      res.status(responseCodes.notFound).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
};

export default coursesController;
