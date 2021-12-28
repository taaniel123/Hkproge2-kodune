import pool from '../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { IUpdateTeacher, INewTeacher, ITeacher } from '../interfaces/teachersInterface';
import hashService from '../hashService';

const teachersService = {
  getAllTeachers: async (): Promise<ITeacher[] | false> => {
    try {
      const [teachers]: [ITeacher[], FieldPacket[]] = await pool.query('SELECT id, firstName, lastName, dateCreated FROM teachers WHERE dateDeleted IS NULL');
      return teachers;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getTeacherById: async (id: number): Promise<ITeacher | false> => {
    try {
      const [teachers]: [ITeacher[], FieldPacket[]] = await pool.query(
        'SELECT id, firstName, lastName, dateCreated, dateUpdated, dateDeleted FROM teachers WHERE id = ? AND dateDeleted IS NULL LIMIT 1', [id],
      );
      return teachers[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeTeacher: async (id: number): Promise<boolean> => {
    try {
      await pool.query('UPDATE teachers SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createTeacher: async (newTeacher: INewTeacher): Promise<number | false> => {
    try {
      const Teacher = {
        ...newTeacher,
      };
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO teachers SET ?', [Teacher]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateTeacher: async (Teacher: IUpdateTeacher): Promise<boolean> => {
    try {
      const teacherToUpdate = { ...Teacher };
      const result = await pool.query('UPDATE teachers SET ? WHERE id = ?', [teacherToUpdate, Teacher.id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default teachersService;
