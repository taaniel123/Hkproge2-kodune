"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subjectsService_1 = __importDefault(require("../services/subjectsService"));
const subjectsController = {
    getAllSubjects: (req, res) => {
        const subjects = subjectsService_1.default.getAllSubjects();
        return res.status(200).json({
            subjects,
        });
    },
    getSubjectById: (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'No valid id provided',
            });
        }
        const subject = subjectsService_1.default.getSubjectById(id);
        if (!subject) {
            return res.status(400).json({
                error: `No subject found with id: ${id}`,
            });
        }
        return res.status(200).json({
            subject,
        });
    },
    removeSubject: (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'No valid id provided',
            });
        }
        const subject = subjectsService_1.default.getSubjectById(id);
        if (!subject) {
            return res.status(400).json({
                message: `Subject not found with id: ${id}`,
            });
        }
        subjectsService_1.default.removeSubject(id);
        return res.status(204).send();
    },
    updateSubject: (req, res) => {
        const id = parseInt(req.params.id, 10);
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
        const subject = subjectsService_1.default.getSubjectById(id);
        if (!subject) {
            return res.status(400).json({
                error: `No Subject found with id: ${id}`,
            });
        }
        subjectsService_1.default.updateSubject({ id, name });
        return res.status(204).send();
    },
    createSubject: (req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                error: 'Subject name is required',
            });
        }
        const id = subjectsService_1.default.createSubject(name);
        return res.status(201).json({
            id,
            name
        });
    },
};
exports.default = subjectsController;
//# sourceMappingURL=subjectsController.js.map