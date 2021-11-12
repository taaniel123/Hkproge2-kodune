"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const roomsService = {
    getAllRooms: () => {
        const { rooms } = db_1.default;
        return rooms;
    },
    getRoomById: (id) => {
        const room = db_1.default.rooms.find((element) => element.id === id);
        return room;
    },
    removeRoom: (id) => {
        const index = db_1.default.rooms.findIndex((element) => element.id === id);
        db_1.default.rooms.splice(index, 1);
        return true;
    },
    createRoom: (number) => {
        const id = db_1.default.rooms.length + 1;
        db_1.default.rooms.push({
            id,
            number
        });
        return id;
    },
    updateRoom: (data) => {
        const { id, number } = data;
        const index = db_1.default.rooms.findIndex((element) => element.id === id);
        if (number) {
            db_1.default.rooms[index].number = number;
        }
        return true;
    },
};
exports.default = roomsService;
//# sourceMappingURL=roomsService.js.map