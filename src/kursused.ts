import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port: number = 3000;
app.use(express.json());


interface Kursus {
    id: number;
    name: string;
};


interface Db {
    kursused: Kursus[];
};
  

const db: Db = { 
    kursused: [
    {
      id: 1,
      name: 'RIF I',
    },
    {
      id: 2,
      name: 'LO 2',
    }
  ]
};


app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'It works',
    });
});


app.get('/kursused', (req: Request, res: Response) => {
    res.status(200).json({
        kursused: db.kursused,
    });
});


app.get('/kursused/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const kursus = db.kursused.find((element) => element.id === id);
    res.status(200).json({
      kursus,
    });
});


app.post('/kursused', (req: Request, res: Response) => {
    const { name } = req.body;
    const id = db.kursused.length + 1;
    db.kursused.push({
        id,
        name,
    });
    res.status(201).json({
        id,
        kursused: db.kursused,
    });
});


app.delete('/kursused/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const index = db.kursused.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(400).json({
        message: `Kursus not found with id: ${id}`,
      });
    }
    db.kursused.splice(index, 1);
    return res.status(204).send();
});


app.patch('/kursused/:id', (req: Request, res: Response) => {
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
    const index = db.kursused.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(400).json({
        error: `No kursus found with id: ${id}`,
      });
    }
    if (name) {
      db.kursused[index].name = name;
    }
    return res.status(204).send();
});

  
app.listen(port, () => {
    console.log('Server is up');
});