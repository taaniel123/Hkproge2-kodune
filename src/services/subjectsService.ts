import pool from '../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { IUpdateSubject, INewSubject, ISubject } from '../interfaces/subjectsInterface';
import hashService from '../hashService';

const subjectsService = {
  getAllSubjects: async (): Promise<ISubject[] | false> => {
    try {
      const [subjects]: [ISubject[], FieldPacket[]] = await pool.query('SELECT id, name, dateCreated FROM subjects WHERE dateDeleted IS NULL');
      return subjects;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getSubjectById: async (id: number): Promise<ISubject | false> => {
      try {
        const [subjects]: [ISubject[], FieldPacket[]] = await pool.query(
          'SELECT id, name, dateCreated, dateUpdated, dateDeleted FROM subjects WHERE id = ? AND dateDeleted IS NULL LIMIT 1', [id],
        );
        return subjects[0];
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    removeSubject: async (id: number): Promise<boolean> => {
      try {
        await pool.query('UPDATE subjects SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createSubject: async (newSubject: INewSubject): Promise<number | false> => {
      try {
        const subject = {
          ...newSubject,
        };
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO subjects SET ?', [subject]);
        return result.insertId;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateSubject: async (Subject: IUpdateSubject): Promise<boolean> => {
      try {
        const subjectToUpdate = { ...Subject };
        const result = await pool.query('UPDATE subjects SET ? WHERE id = ?', [subjectToUpdate, Subject.id]);
        console.log(result);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  };
  
  export default subjectsService;