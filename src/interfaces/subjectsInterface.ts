import { RowDataPacket } from 'mysql2';

interface INewSubject {
    name: string;
};

interface ISubject extends INewSubject, RowDataPacket {
    id: number;
    dateCreated: Date;
    dateUpdated: Date;
    dateDeleted: Date | null;
}

interface IUpdateSubject {
    id: number;
    name?: string;
}

export { ISubject, IUpdateSubject, INewSubject };