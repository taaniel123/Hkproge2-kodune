import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port: number = 3000;
app.use(express.json());


interface Aine {
    id: number;
    name: string;
};


interface Db {
    ained: Aine[];
};
  

const db: Db = { 
    ained: [
    {
      id: 1,
      name: 'Andmebaasid (HKI5012.HK)',
    },
    {
      id: 2,
      name: 'Dietoloogia (HKT5051.HK)',
    }
  ]
};


app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'It works',
    });
});


app.get('/ained', (req: Request, res: Response) => {
    res.status(200).json({
        ained: db.ained,
    });
});


app.get('/ained/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const aine = db.ained.find((element) => element.id === id);
    res.status(200).json({
      aine,
    });
});


app.post('/ained', (req: Request, res: Response) => {
    const { name } = req.body;
    const id = db.ained.length + 1;
    db.ained.push({
        id,
        name,
    });
    res.status(201).json({
        id,
        ained: db.ained,
    });
});


app.delete('/ained/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const index = db.ained.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(400).json({
        message: `Aine not found with id: ${id}`,
      });
    }
    db.ained.splice(index, 1);
    return res.status(204).send();
});


app.patch('/ained/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    if (!name) {
      return res.status(400).json({
        error: 'Nothing to update',
      });
    }
    const index = db.ained.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(400).json({
        error: `No aine found with id: ${id}`,
      });
    }
    if (name) {
      db.ained[index].name = name;
    }
    return res.status(204).send();
});

  
app.listen(port, () => {
    console.log('Server is up');
});