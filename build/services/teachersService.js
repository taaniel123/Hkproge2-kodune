"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const teachersService = {
    getAllTeachers: () => {
        const { teachers } = db_1.default;
        return teachers;
    },
    getTeacherById: (id) => {
        const teacher = db_1.default.teachers.find((element) => element.id === id);
        return teacher;
    },
    removeTeacher: (id) => {
        const index = db_1.default.teachers.findIndex((element) => element.id === id);
        db_1.default.teachers.splice(index, 1);
        return true;
    },
    createTeacher: (firstName, lastName) => {
        const id = db_1.default.teachers.length + 1;
        db_1.default.teachers.push({
            id,
            firstName,
            lastName,
        });
        return id;
    },
    updateTeacher: (data) => {
        const { id, firstName, lastName } = data;
        const index = db_1.default.teachers.findIndex((element) => element.id === id);
        if (firstName) {
            db_1.default.teachers[index].firstName = firstName;
        }
        if (lastName) {
            db_1.default.teachers[index].lastName = lastName;
        }
        return true;
    },
};
exports.default = teachersService;
//# sourceMappingURL=teachersService.js.map