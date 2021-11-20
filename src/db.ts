import Course from './interfaces/coursesInterface';
import Room from './interfaces/roomsInterface';
import Subject from './interfaces/subjectsInterface';
import Teacher from './interfaces/teachersInterface';
import { User } from './interfaces/usersInterface';


interface Db {
    courses: Course[];
    rooms: Room[];
    subjects: Subject[];
    teachers: Teacher[];
    users: User[];
}

const db: Db = {
    courses: [
        {
            id: 1,
            name: 'RIF I',
        },
        {
            id: 2,
            name: 'LO 2',
        }
    ],
    rooms: [
        {
            id: 1,
            number: 201,
        },
        {
            id: 2,
            number: 301,
        }
    ],
    subjects: [
        {
            id: 1,
            name: 'Andmebaasid (HKI5012.HK)',
        },
        {
            id: 2,
            name: 'Dietoloogia (HKT5051.HK)',
        }
    ],
    teachers: [
        {
            id: 1,
            firstName: 'Andrus',
            lastName: 'Rinde'
        },
        {
            id: 2,
            firstName: 'Martti',
            lastName: 'Raavel'
        }
    ],
    users: [
        {
          id: 1,
          firstName: 'Taaniel',
          lastName: 'Terane',
          email: 'taaniel@gmail.com',
          password: '$2b$10$cV1PqES2oHTrRDtXDRY6oea.4nV3Xk1Z2XSuIKJozzreNEhKwPOm2',
          role: 'Admin',
        },
        {
          id: 2,
          firstName: 'Juhan',
          lastName: 'Juut',
          email: 'juut@gmail.com',
          password: '$2b$10$qAJqawR4Bk6pp6JlhK/EbuzivRxJgsrm52M/d/zqKxyfRdks6qDpi',
          role: 'User',
        },
      ],
};

export default db;