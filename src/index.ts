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


const app: Application = express();
const port: number = 1337;

app.use(express.json());
app.use(logger);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     

app.get('/', (req: Request, res: Response) => {
    res.send('What is up Martti' + '<br/> Read docs from here: <a href="http://localhost:1337/docs">Swagger</a>');
});

app.get('/courses', coursesController.getAllCourses);
app.get('/rooms', roomsController.getAllRooms);
app.get('/subjects', subjectsController.getAllSubjects);
app.get('/teachers', teachersController.getAllTeachers);


app.get('/courses/:id', coursesController.getCourseById);
app.get('/rooms/:id', roomsController.getRoomById);
app.get('/subjects/:id', subjectsController.getSubjectById);
app.get('/teachers/:id', teachersController.getTeacherById);


app.post('/courses', /*validate(nameSchema),*/ coursesController.createCourse);
app.post('/rooms', roomsController.createRoom);
app.post('/subjects', /*validate(nameSchema),*/ subjectsController.createSubject);
app.post('/teachers', teachersController.createTeacher);


app.delete('/courses/:id', coursesController.removeCourse);
app.delete('/rooms/:id', roomsController.removeRoom);
app.delete('/subjects/:id', subjectsController.removeSubject);
app.delete('/teachers/:id', teachersController.removeTeacher);


app.patch('/courses/:id', coursesController.updateCourse);
app.patch('/rooms/:id', roomsController.updateRoom);
app.patch('/subjects/:id', subjectsController.updateSubject);
app.patch('/teachers/:id', teachersController.updateTeacher);


app.listen(port, () => {
    console.log('Server jookseb');
});
