"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const subjectsService = {
    getAllSubjects: () => {
        const { subjects } = db_1.default;
        return subjects;
    },
    getSubjectById: (id) => {
        const subject = db_1.default.subjects.find((element) => element.id === id);
        return subject;
    },
    removeSubject: (id) => {
        const index = db_1.default.subjects.findIndex((element) => element.id === id);
        db_1.default.subjects.splice(index, 1);
        return true;
    },
    createSubject: (name) => {
        const id = db_1.default.subjects.length + 1;
        db_1.default.subjects.push({
            id,
            name
        });
        return id;
    },
    updateSubject: (data) => {
        const { id, name } = data;
        const index = db_1.default.subjects.findIndex((element) => element.id === id);
        if (name) {
            db_1.default.subjects[index].name = name;
        }
        return true;
    },
};
exports.default = subjectsService;
//# sourceMappingURL=subjectsService.js.map