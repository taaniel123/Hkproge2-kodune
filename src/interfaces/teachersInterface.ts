import { RowDataPacket } from 'mysql2';

interface INewTeacher {
    firstName: string;
    lastName: string;
};

interface ITeacher extends INewTeacher, RowDataPacket {
    id: number;
    dateCreated: Date;
    dateUpdated: Date;
    dateDeleted: Date | null;
}

interface IUpdateTeacher {
    id: number;
    firstName?: string;
    lastName?: string;
}

export { ITeacher, IUpdateTeacher, INewTeacher };