import { RowDataPacket } from 'mysql2';

interface INewCourse {
    name: string;
};

interface ICourse extends INewCourse, RowDataPacket {
    id: number;
    dateCreated: Date;
    dateUpdated: Date;
    dateDeleted: Date | null;
}

interface IUpdateCourse {
    id: number;
    name?: string;
}

export { ICourse, IUpdateCourse, INewCourse };