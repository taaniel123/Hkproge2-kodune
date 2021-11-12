"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coursesService_1 = __importDefault(require("../services/coursesService"));
const coursesController = {
    getAllCourses: (req, res) => {
        const courses = coursesService_1.default.getAllCourses();
        return res.status(200).json({
            courses,
        });
    },
    getCourseById: (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'No valid id provided',
            });
        }
        const course = coursesService_1.default.getCourseById(id);
        if (!course) {
            return res.status(400).json({
                error: `No course found with id: ${id}`,
            });
        }
        return res.status(200).json({
            course,
        });
    },
    removeCourse: (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'No valid id provided',
            });
        }
        const course = coursesService_1.default.getCourseById(id);
        if (!course) {
            return res.status(400).json({
                message: `Course not found with id: ${id}`,
            });
        }
        coursesService_1.default.removeCourse(id);
        return res.status(204).send();
    },
    updateCourse: (req, res) => {
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
        const course = coursesService_1.default.getCourseById(id);
        if (!course) {
            return res.status(400).json({
                error: `No course found with id: ${id}`,
            });
        }
        coursesService_1.default.updateCourse({ id, name });
        return res.status(204).send();
    },
    createCourse: (req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                error: 'Course name is required',
            });
        }
        const id = coursesService_1.default.createCourse(name);
        return res.status(201).json({
            id,
            name
        });
    },
};
exports.default = coursesController;
//# sourceMappingURL=coursesController.js.map