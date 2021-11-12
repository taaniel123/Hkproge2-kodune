"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const coursesController_1 = __importDefault(require("./controllers/coursesController"));
const roomsController_1 = __importDefault(require("./controllers/roomsController"));
const subjectsController_1 = __importDefault(require("./controllers/subjectsController"));
const teachersController_1 = __importDefault(require("./controllers/teachersController"));
const logger_1 = __importDefault(require("./auth/middlewares/logger"));
const validateRequest_1 = __importDefault(require("./auth/middlewares/validateRequest"));
const nameValidation_1 = __importDefault(require("./auth/middlewares/nameValidation"));
const app = express_1.default();
const port = 1337;
app.use(express_1.default.json());
app.use(logger_1.default);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send('What is up Martti' + '<br/> Read docs from here: <a href="http://localhost:1337/docs">Swagger</a>');
});
app.get('/courses', coursesController_1.default.getAllCourses);
app.get('/rooms', roomsController_1.default.getAllRooms);
app.get('/subjects', subjectsController_1.default.getAllSubjects);
app.get('/teachers', teachersController_1.default.getAllTeachers);
app.get('/courses/:id', coursesController_1.default.getCourseById);
app.get('/rooms/:id', roomsController_1.default.getRoomById);
app.get('/subjects/:id', subjectsController_1.default.getSubjectById);
app.get('/teachers/:id', teachersController_1.default.getTeacherById);
app.post('/courses', validateRequest_1.default(nameValidation_1.default), coursesController_1.default.createCourse);
app.post('/rooms', roomsController_1.default.createRoom);
app.post('/subjects', /*validate(nameSchema),*/ subjectsController_1.default.createSubject);
app.post('/teachers', teachersController_1.default.createTeacher);
app.delete('/courses/:id', coursesController_1.default.removeCourse);
app.delete('/rooms/:id', roomsController_1.default.removeRoom);
app.delete('/subjects/:id', subjectsController_1.default.removeSubject);
app.delete('/teachers/:id', teachersController_1.default.removeTeacher);
app.patch('/courses/:id', coursesController_1.default.updateCourse);
app.patch('/rooms/:id', roomsController_1.default.updateRoom);
app.patch('/subjects/:id', subjectsController_1.default.updateSubject);
app.patch('/teachers/:id', teachersController_1.default.updateTeacher);
app.listen(port, () => {
    console.log('Server jookseb');
});
//# sourceMappingURL=index.js.map