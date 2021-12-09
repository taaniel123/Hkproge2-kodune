import { RowDataPacket } from 'mysql2';

interface INewRoom {
    number: number;
};

interface IRoom extends INewRoom, RowDataPacket {
    id: number;
    dateCreated: Date;
    dateUpdated: Date;
    dateDeleted: Date | null;
}

interface IUpdateRoom {
    id: number;
    number?: number;
}

export { IRoom, IUpdateRoom, INewRoom };