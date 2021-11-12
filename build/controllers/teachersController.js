"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teachersService_1 = __importDefault(require("../services/teachersService"));
const teachersController = {
    getAllTeachers: (req, res) => {
        const teachers = teachersService_1.default.getAllTeachers();
        return res.status(200).json({
            teachers,
        });
    },
    getTeacherById: (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'No valid id provided',
            });
        }
        const teacher = teachersService_1.default.getTeacherById(id);
        if (!teacher) {
            return res.status(400).json({
                error: `No teacher found with id: ${id}`,
            });
        }
        return res.status(200).json({
            teacher,
        });
    },
    removeTeacher: (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'No valid id provided',
            });
        }
        const teacher = teachersService_1.default.getTeacherById(id);
        if (!teacher) {
            return res.status(400).json({
                message: `teacher not found with id: ${id}`,
            });
        }
        teachersService_1.default.removeTeacher(id);
        return res.status(204).send();
    },
    updateTeacher: (req, res) => {
        const id = parseInt(req.params.id, 10);
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
        const teacher = teachersService_1.default.getTeacherById(id);
        if (!teacher) {
            return res.status(400).json({
                error: `No teacher found with id: ${id}`,
            });
        }
        teachersService_1.default.updateTeacher({ id, firstName, lastName });
        return res.status(204).send();
    },
    createTeacher: (req, res) => {
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
        const id = teachersService_1.default.createTeacher(firstName, lastName);
        return res.status(201).json({
            id,
            firstName, lastName
        });
    },
};
exports.default = teachersController;
//# sourceMappingURL=teachersController.js.map