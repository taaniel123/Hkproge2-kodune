import { Request, Response } from 'express';
import roomsService from '../services/roomsService';

const roomsController = {
  getAllRooms: (req: Request, res: Response) => {
    const rooms = roomsService.getAllRooms();
    return res.status(200).json({
      rooms,
    });
  },
  getRoomById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const room = roomsService.getRoomById(id);
    if (!room) {
      return res.status(400).json({
        error: `No room found with id: ${id}`,
      });
    }
    return res.status(200).json({
      room,
    });
  },
  removeRoom: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const room = roomsService.getRoomById(id);
    if (!room) {
      return res.status(400).json({
        message: `Room not found with id: ${id}`,
      });
    }
    roomsService.removeRoom(id);
    return res.status(204).send();
  },
  updateRoom: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { number } = req.body;
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    if (!number) {
      return res.status(400).json({
        error: 'Nothing to update',
      });
    }
    const room = roomsService.getRoomById(id);
    if (!room) {
      return res.status(400).json({
        error: `No room found with id: ${id}`,
      });
    }
    roomsService.updateRoom({ id, number });
    return res.status(204).send();
  },
  createRoom: (req: Request, res: Response) => {
    const { number } = req.body;
    if (!number) {
      return res.status(400).json({
        error: 'Room number is required',
      });
    }
    const id = roomsService.createRoom(number);
    return res.status(201).json({
      id,
      number
    });
  },
};

export default roomsController;
