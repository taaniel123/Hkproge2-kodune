import { Request, Response } from 'express';
import coursesService from '../services/coursesService';

const coursesController = {
  getAllCourses: (req: Request, res: Response) => {
    const courses = coursesService.getAllCourses();
    return res.status(200).json({
      courses,
    });
  },
  getCourseById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const course = coursesService.getCourseById(id);
    if (!course) {
      return res.status(400).json({
        error: `No course found with id: ${id}`,
      });
    }
    return res.status(200).json({
      course,
    });
  },
  removeCourse: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const course = coursesService.getCourseById(id);
    if (!course) {
      return res.status(400).json({
        message: `Course not found with id: ${id}`,
      });
    }
    coursesService.removeCourse(id);
    return res.status(204).send();
  },
  updateCourse: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    if (!name) {
      return res.status(400).json({
        error: 'Nothing to update',
      });
    }
    const course = coursesService.getCourseById(id);
    if (!course) {
      return res.status(400).json({
        error: `No course found with id: ${id}`,
      });
    }
    coursesService.updateCourse({ id, name });
    return res.status(204).send();
  },
  createCourse: (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        error: 'Course name is required',
      });
    }
    const id = coursesService.createCourse(name);
    return res.status(201).json({
      id,
      name
    });
  },
};

export default coursesController;
