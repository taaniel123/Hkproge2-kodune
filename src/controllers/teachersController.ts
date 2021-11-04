import { Request, Response } from 'express';
import teachersService from '../services/teachersService';

const teachersController = {
  getAllTeachers: (req: Request, res: Response) => {
    const teachers = teachersService.getAllTeachers();
    return res.status(200).json({
      teachers,
    });
  },
  getTeacherById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const teacher = teachersService.getTeacherById(id);
    if (!teacher) {
      return res.status(400).json({
        error: `No teacher found with id: ${id}`,
      });
    }
    return res.status(200).json({
      teacher,
    });
  },
  removeTeacher: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const teacher = teachersService.getTeacherById(id);
    if (!teacher) {
      return res.status(400).json({
        message: `teacher not found with id: ${id}`,
      });
    }
    teachersService.removeTeacher(id);
    return res.status(204).send();
  },
  updateTeacher: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName && !lastName) {
      return res.status(400).json({
        error: 'Nothing to update',
      });
    }
    const teacher = teachersService.getTeacherById(id);
    if (!teacher) {
      return res.status(400).json({
        error: `No teacher found with id: ${id}`,
      });
    }
    teachersService.updateTeacher({ id, firstName, lastName });
    return res.status(204).send();
  },
  createTeacher: (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    if (!firstName) {
      return res.status(400).json({
        error: 'First name is required',
      });
    }
    if (!lastName) {
      return res.status(400).json({
        error: 'Last name is required',
      });
    }
    const id = teachersService.createTeacher(firstName, lastName);
    return res.status(201).json({
      id,
      firstName, lastName
    });
  },
};

export default teachersController;
