import pool from '../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { IUpdateCourse, INewCourse, ICourse } from '../interfaces/coursesInterface';
import hashService from '../hashService';

const coursesService = {
  getAllCourses: async (): Promise<ICourse[] | false> => {
    try {
      const [courses]: [ICourse[], FieldPacket[]] = await pool.query('SELECT id, name, dateCreated FROM courses WHERE dateDeleted IS NULL');
      return courses;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getCourseById: async (id: number): Promise<ICourse | false> => {
      try {
        const [courses]: [ICourse[], FieldPacket[]] = await pool.query(
          'SELECT id, name, dateCreated, dateUpdated, dateDeleted FROM courses WHERE id = ? AND dateDeleted IS NULL LIMIT 1', [id],
        );
        return courses[0];
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    removeCourse: async (id: number): Promise<boolean> => {
      try {
        await pool.query('UPDATE courses SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createCourse: async (newCourse: INewCourse): Promise<number | false> => {
      try {
        const course = {
          ...newCourse,
        };
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO courses SET ?', [course]);
        return result.insertId;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateCourse: async (course: IUpdateCourse): Promise<boolean> => {
      try {
        const courseToUpdate = { ...course };
        const result = await pool.query('UPDATE courses SET ? WHERE id = ?', [courseToUpdate, course.id]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  };
  
  export default coursesService;