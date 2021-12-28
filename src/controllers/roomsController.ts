import { Request, Response } from 'express';
import responseCodes from '../responseCodes';
import roomsService from '../services/roomsService';
import { IUpdateRoom, INewRoom } from '../interfaces/roomsInterface';

const roomsController = {
  getAllRooms: async (req: Request, res: Response) => {
    const rooms = await roomsService.getAllRooms();
    return res.status(responseCodes.ok).json({
      rooms,
    });
  },
  getRoomById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if ((id === res.locals.user.id) || (res.locals.user.role === 'Admin')) {
      const room = await roomsService.getRoomById(id);
      if (!room) {
        return res.status(responseCodes.badRequest).json({
          error: `No room found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      room,
    });
    }
    return res.status(responseCodes.notAuthorized).json({
      error: 'No permission',
    });
  },
  removeRoom: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const room = await roomsService.getRoomById(id);
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        message: `Room not found with id: ${id}`,
      });
    }
    await roomsService.removeRoom(id);
    return res.status(responseCodes.noContent).json({});
  },
  createRoom: async (req: Request, res: Response) => {
    const { number } = req.body;
    const newRoom: INewRoom = {
      number,
    };
    const id = await roomsService.createRoom(newRoom);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateRoom: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { number } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!number) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const room = roomsService.getRoomById(id);
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: `No room found with id: ${id}`,
      });
    }
    const updateRoom: IUpdateRoom = {
      id,
    };
    if (number) updateRoom.number = number;
    const result = await roomsService.updateRoom(updateRoom);
    if (!result) {
      res.status(responseCodes.notFound).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
};

export default roomsController;
