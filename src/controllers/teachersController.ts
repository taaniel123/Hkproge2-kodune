import { Request, Response } from 'express';
import responseCodes from '../responseCodes';
import teachersService from '../services/teachersService';
import { IUpdateTeacher, INewTeacher } from '../interfaces/teachersInterface';

const teachersController = {
  getAllTeachers: async (req: Request, res: Response) => {
    const teachers = await teachersService.getAllTeachers();
    return res.status(responseCodes.ok).json({
      teachers,
    });
  },
  getTeacherById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if ((id === res.locals.user.id) || (res.locals.user.role === 'Admin')) {
      const teacher = await teachersService.getTeacherById(id);
      if (!teacher) {
        return res.status(responseCodes.badRequest).json({
          error: `No teacher found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      teacher,
    });
    }
    return res.status(responseCodes.notAuthorized).json({
      error: 'No permission',
    });
  },
  removeTeacher: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const teacher = await teachersService.getTeacherById(id);
    if (!teacher) {
      return res.status(responseCodes.badRequest).json({
        message: `Teacher not found with id: ${id}`,
      });
    }
    await teachersService.removeTeacher(id);
    return res.status(responseCodes.noContent).json({});
  },
  createTeacher: async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    const newTeacher: INewTeacher = {
      firstName,
      lastName
    };
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'First name is required',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Last name is required',
      });
    }
    const id = await teachersService.createTeacher(newTeacher);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateTeacher: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const teacher = await teachersService.getTeacherById(id);
    if (!teacher) {
      return res.status(responseCodes.badRequest).json({
        error: `No teacher found with id: ${id}`,
      });
    }
    const updateTeacher: IUpdateTeacher = {
      id,
    };
    if (firstName) updateTeacher.firstName = firstName;
    if (lastName) updateTeacher.lastName = lastName;
    const result = await teachersService.updateTeacher(updateTeacher);
    if (!result) {
      res.status(responseCodes.notFound).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
};

export default teachersController;
