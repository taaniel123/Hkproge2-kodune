import { Request, Response } from 'express';
import subjectsService from '../services/subjectsService';

const subjectsController = {
  getAllSubjects: (req: Request, res: Response) => {
    const subjects = subjectsService.getAllSubjects();
    return res.status(200).json({
      subjects,
    });
  },
  getSubjectById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const subject = subjectsService.getSubjectById(id);
    if (!subject) {
      return res.status(400).json({
        error: `No subject found with id: ${id}`,
      });
    }
    return res.status(200).json({
      subject,
    });
  },
  removeSubject: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const subject = subjectsService.getSubjectById(id);
    if (!subject) {
      return res.status(400).json({
        message: `Subject not found with id: ${id}`,
      });
    }
    subjectsService.removeSubject(id);
    return res.status(204).send();
  },
  updateSubject: (req: Request, res: Response) => {
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
    const subject = subjectsService.getSubjectById(id);
    if (!subject) {
      return res.status(400).json({
        error: `No Subject found with id: ${id}`,
      });
    }
    subjectsService.updateSubject({ id, name });
    return res.status(204).send();
  },
  createSubject: (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        error: 'Subject name is required',
      });
    }
    const id = subjectsService.createSubject(name);
    return res.status(201).json({
      id,
      name
    });
  },
};

export default subjectsController;
