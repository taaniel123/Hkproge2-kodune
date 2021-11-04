import db from '../db';
import Course from '../interfaces/coursesInterface';

const coursesService = {
    getAllCourses: (): Course[] => {
      const { courses } = db;
      return courses;
    },
    getCourseById: (id: number): Course | undefined => {
      const course = db.courses.find((element) => element.id === id);
      return course;
    },
    removeCourse: (id: number): boolean => {
      const index = db.courses.findIndex((element) => element.id === id);
      db.courses.splice(index, 1);
      return true;
    },
    createCourse: (name: string) => {
      const id = db.courses.length + 1;
      db.courses.push({
        id,
        name
      });
      return id;
    },
    updateCourse: (data: { id: number, name?: string }): boolean => {
      const { id, name } = data;
      const index = db.courses.findIndex((element) => element.id === id);
      if (name) {
        db.courses[index].name = name;
      }
      return true;
    },
  };
  
  export default coursesService;