"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomsService_1 = __importDefault(require("../services/roomsService"));
const roomsController = {
    getAllRooms: (req, res) => {
        const rooms = roomsService_1.default.getAllRooms();
        return res.status(200).json({
            rooms,
        });
    },
    getRoomById: (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'No valid id provided',
            });
        }
        const room = roomsService_1.default.getRoomById(id);
        if (!room) {
            return res.status(400).json({
                error: `No room found with id: ${id}`,
            });
        }
        return res.status(200).json({
            room,
        });
    },
    removeRoom: (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'No valid id provided',
            });
        }
        const room = roomsService_1.default.getRoomById(id);
        if (!room) {
            return res.status(400).json({
                message: `Room not found with id: ${id}`,
            });
        }
        roomsService_1.default.removeRoom(id);
        return res.status(204).send();
    },
    updateRoom: (req, res) => {
        const id = parseInt(req.params.id, 10);
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
        const room = roomsService_1.default.getRoomById(id);
        if (!room) {
            return res.status(400).json({
                error: `No room found with id: ${id}`,
            });
        }
        roomsService_1.default.updateRoom({ id, number });
        return res.status(204).send();
    },
    createRoom: (req, res) => {
        const { number } = req.body;
        if (!number) {
            return res.status(400).json({
                error: 'Room number is required',
            });
        }
        const id = roomsService_1.default.createRoom(number);
        return res.status(201).json({
            id,
            number
        });
    },
};
exports.default = roomsController;
//# sourceMappingURL=roomsController.js.map