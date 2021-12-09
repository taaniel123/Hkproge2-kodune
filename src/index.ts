import express, { Request, Response, Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'
import coursesController from './controllers/coursesController';
import roomsController from './controllers/roomsController'
import subjectsController from './controllers/subjectsController';
import teachersController from './controllers/teachersController';
import logger from './auth/middlewares/logger';
import validate from './auth/middlewares/validateRequest';
import nameSchema from './auth/middlewares/nameValidation';
import usersController from './controllers/usersController';
import authController from './controllers/authController';
import isLoggedIn from './auth/middlewares/isLoggedInMiddleware';
import isAdmin from './auth/middlewares/isAdminMiddleware';

const app: Application = express();
const port: number = 1337;

app.use(express.json());
app.use(logger);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     

app.get('/', (req: Request, res: Response) => {
    res.send('What is up Martti' + '<br/> Read docs from here: <a href="http://localhost:1337/docs">Swagger</a>');
});

app.post('/login', authController.login);
app.post('/users', usersController.createUser);

app.use(isLoggedIn);


app.get('/courses', isAdmin, coursesController.getAllCourses);
app.get('/rooms', isAdmin, roomsController.getAllRooms);
app.get('/subjects', isAdmin, subjectsController.getAllSubjects);
app.get('/teachers', isAdmin, teachersController.getAllTeachers);
app.get('/users', isAdmin, usersController.getAllUsers);


app.get('/courses/:id', coursesController.getCourseById);
app.get('/rooms/:id', roomsController.getRoomById);
app.get('/subjects/:id', subjectsController.getSubjectById);
app.get('/teachers/:id', teachersController.getTeacherById);
app.get('/users/:id', usersController.getUserById);


app.post('/courses', validate(nameSchema), coursesController.createCourse);
app.post('/rooms', roomsController.createRoom);
app.post('/subjects', validate(nameSchema), subjectsController.createSubject);
app.post('/teachers', teachersController.createTeacher);


app.delete('/courses/:id', coursesController.removeCourse);
app.delete('/rooms/:id', roomsController.removeRoom);
app.delete('/subjects/:id', subjectsController.removeSubject);
app.delete('/teachers/:id', teachersController.removeTeacher);
app.delete('/users/:id', usersController.removeUser);


app.patch('/courses/:id', coursesController.updateCourse);
app.patch('/rooms/:id', roomsController.updateRoom);
app.patch('/subjects/:id', subjectsController.updateSubject);
app.patch('/teachers/:id', teachersController.updateTeacher);
app.patch('/users/:id', usersController.updateUser);


app.listen(port, () => {
    console.log('Server jookseb');
});
