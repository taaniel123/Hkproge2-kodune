import pool from '../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { IUpdateRoom, INewRoom, IRoom } from '../interfaces/roomsInterface';
import hashService from '../hashService';

const roomsService = {
  getAllRooms: async (): Promise<IRoom[] | false> => {
    try {
      const [rooms]: [IRoom[], FieldPacket[]] = await pool.query('SELECT id, number, dateCreated FROM rooms WHERE dateDeleted IS NULL');
      return rooms;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getRoomById: async (id: number): Promise<IRoom | false> => {
      try {
        const [rooms]: [IRoom[], FieldPacket[]] = await pool.query(
          'SELECT id, number, dateCreated, dateUpdated, dateDeleted FROM rooms WHERE id = ? AND dateDeleted IS NULL LIMIT 1', [id],
        );
        return rooms[0];
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    removeRoom: async (id: number): Promise<boolean> => {
      try {
        await pool.query('UPDATE rooms SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createRoom: async (newRoom: INewRoom): Promise<number | false> => {
      try {
        const room = {
          ...newRoom,
        };
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO rooms SET ?', [room]);
        return result.insertId;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateRoom: async (room: IUpdateRoom): Promise<boolean> => {
      try {
        const RoomToUpdate = { ...room };
        const result = await pool.query('UPDATE rooms SET ? WHERE id = ?', [RoomToUpdate, room.id]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  };
  
  export default roomsService;