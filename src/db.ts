import Course from './interfaces/coursesInterface';
import Room from './interfaces/roomsInterface';
import Subject from './interfaces/subjectsInterface';
import Teacher from './interfaces/teachersInterface';

interface Db {
    courses: Course[];
    rooms: Room[];
    subjects: Subject[];
    teachers: Teacher[];
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
    ]
};

export default db;