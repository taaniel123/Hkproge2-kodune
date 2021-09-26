import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port: number = 3000;
app.use(express.json());


interface Õppejõud {
    id: number;
    firstName: string;
    lastName: string;
};


interface Db {
    õppejõud: Õppejõud[];
};
  

const db: Db = { 
    õppejõud: [
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


app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'It works',
    });
});


app.get('/õppejõud', (req: Request, res: Response) => {
    res.status(200).json({
        õppejõud: db.õppejõud,
    });
});


app.get('/õppejõud/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const õppejõud = db.õppejõud.find((element) => element.id === id);
    res.status(200).json({
      õppejõud,
    });
});


app.post('/õppejõud', (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    const id = db.õppejõud.length + 1;
    db.õppejõud.push({
        id,
        firstName,
        lastName
    });
    res.status(201).json({
        id,
        õppejõud: db.õppejõud,
    });
});


app.delete('/õppejõud/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const index = db.õppejõud.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(400).json({
        message: `Õppejõud not found with id: ${id}`,
      });
    }
    db.õppejõud.splice(index, 1);
    return res.status(204).send();
});


app.patch('/õppejõud/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName && !lastName) {
      return res.status(400).json({
        error: 'Nothing to update',
      });
    }
    const index = db.õppejõud.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(400).json({
        error: `No õppejõud found with id: ${id}`,
      });
    }
    if (firstName && lastName) {
      db.õppejõud[index].firstName = firstName;
      db.õppejõud[index].lastName = lastName;
    }
    return res.status(204).send();
});

  
app.listen(port, () => {
    console.log('Server is up');
});