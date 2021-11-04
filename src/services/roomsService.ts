import db from '../db';
import Room from '../interfaces/roomsInterface';

const roomsService = {
    getAllRooms: (): Room[] => {
      const { rooms } = db;
      return rooms;
    },
    getRoomById: (id: number): Room | undefined => {
      const room = db.rooms.find((element) => element.id === id);
      return room;
    },
    removeRoom: (id: number): boolean => {
      const index = db.rooms.findIndex((element) => element.id === id);
      db.rooms.splice(index, 1);
      return true;
    },
    createRoom: (number: number) => {
      const id = db.rooms.length + 1;
      db.rooms.push({
        id,
        number
      });
      return id;
    },
    updateRoom: (data: { id: number, number: number }): boolean => {
      const { id, number } = data;
      const index = db.rooms.findIndex((element) => element.id === id);
      if (number) {
        db.rooms[index].number = number;
      }
      return true;
    },
  };
  
  export default roomsService;