import { Request, Response } from 'express';
import responseCodes from '../responseCodes';
import subjectsService from '../services/subjectsService';
import { IUpdateSubject, INewSubject } from '../interfaces/subjectsInterface';

const subjectsController = {
  getAllSubjects: async (req: Request, res: Response) => {
    const subjects = await subjectsService.getAllSubjects();
    return res.status(responseCodes.ok).json({
      subjects,
    });
  },
  getSubjectById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if ((id === res.locals.Subject.id) || (res.locals.Subject.role === 'Admin')) {
      const subject = await subjectsService.getSubjectById(id);
      if (!subject) {
        return res.status(responseCodes.badRequest).json({
          error: `No subject found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      subject,
    });
    }
    return res.status(responseCodes.notAuthorized).json({
      error: 'No permission',
    });
  },
  removeSubject: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const subject = await subjectsService.getSubjectById(id);
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        message: `Subject not found with id: ${id}`,
      });
    }
    await subjectsService.removeSubject(id);
    return res.status(responseCodes.noContent).json({});
  },
  createSubject: async (req: Request, res: Response) => {
    const { name } = req.body;
    const newSubject: INewSubject = {
      name,
    };
    const id = await subjectsService.createSubject(newSubject);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateSubject: async (req: Request, res: Response) => {
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
    const subject = subjectsService.getSubjectById(id);
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: `No subject found with id: ${id}`,
      });
    }
    const updateSubject: IUpdateSubject = {
      id,
    };
    if (name) updateSubject.name = name;
    const result = await subjectsService.updateSubject(updateSubject);
    if (!result) {
      res.status(responseCodes.notFound).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
};

export default subjectsController;
