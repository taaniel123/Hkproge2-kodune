import express, { Request, Response, Application } from 'express';

const app: Application = express();
const port: number = 3000;
app.use(express.json());


interface Ruum {
    id: number;
    number: number;
};


interface Db {
    ruumid: Ruum[];
};
  

const db: Db = { 
    ruumid: [
    {
      id: 1,
      number: 201,
    },
    {
      id: 2,
      number: 301,
    }
  ]
};


app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'It works',
    });
});


app.get('/ruumid', (req: Request, res: Response) => {
    res.status(200).json({
        ruumid: db.ruumid,
    });
});


app.get('/ruumid/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const ruum = db.ruumid.find((element) => element.id === id);
    res.status(200).json({
      ruum,
    });
});


app.post('/ruumid', (req: Request, res: Response) => {
    const { number } = req.body;
    const id = db.ruumid.length + 1;
    db.ruumid.push({
        id,
        number,
    });
    res.status(201).json({
        id,
        ruumid: db.ruumid,
    });
});


app.delete('/ruumid/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    const index = db.ruumid.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(400).json({
        message: `Ruum not found with id: ${id}`,
      });
    }
    db.ruumid.splice(index, 1);
    return res.status(204).send();
});


app.patch('/ruumid/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { number } = req.body;
    if (!id) {
      return res.status(400).json({
        error: 'No valid id provided',
      });
    }
    if (!number) {
      return res.status(400).json({
        error: 'Nothing to update',
      });
    }
    const index = db.ruumid.findIndex((element) => element.id === id);
    if (index < 0) {
      return res.status(400).json({
        error: `No ruum found with id: ${id}`,
      });
    }
    if (number) {
      db.ruumid[index].number = number;
    }
    return res.status(204).send();
});

  
app.listen(port, () => {
    console.log('Server is up');
});