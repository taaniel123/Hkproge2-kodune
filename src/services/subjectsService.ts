import db from '../db';
import Subject from '../interfaces/subjectsInterface';

const subjectsService = {
    getAllSubjects: (): Subject[] => {
      const { subjects } = db;
      return subjects;
    },
    getSubjectById: (id: number): Subject | undefined => {
      const subject = db.subjects.find((element) => element.id === id);
      return subject;
    },
    removeSubject: (id: number): boolean => {
      const index = db.subjects.findIndex((element) => element.id === id);
      db.subjects.splice(index, 1);
      return true;
    },
    createSubject: (name: string) => {
      const id = db.subjects.length + 1;
      db.subjects.push({
        id,
        name
      });
      return id;
    },
    updateSubject: (data: { id: number, name?: string }): boolean => {
      const { id, name } = data;
      const index = db.subjects.findIndex((element) => element.id === id);
      if (name) {
        db.subjects[index].name = name;
      }
      return true;
    },
  };
  
  export default subjectsService;