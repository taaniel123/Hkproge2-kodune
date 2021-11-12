"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const coursesService = {
    getAllCourses: () => {
        const { courses } = db_1.default;
        return courses;
    },
    getCourseById: (id) => {
        const course = db_1.default.courses.find((element) => element.id === id);
        return course;
    },
    removeCourse: (id) => {
        const index = db_1.default.courses.findIndex((element) => element.id === id);
        db_1.default.courses.splice(index, 1);
        return true;
    },
    createCourse: (name) => {
        const id = db_1.default.courses.length + 1;
        db_1.default.courses.push({
            id,
            name
        });
        return id;
    },
    updateCourse: (data) => {
        const { id, name } = data;
        const index = db_1.default.courses.findIndex((element) => element.id === id);
        if (name) {
            db_1.default.courses[index].name = name;
        }
        return true;
    },
};
exports.default = coursesService;
//# sourceMappingURL=coursesService.js.map