import express, { Request, Response } from 'express';
import authRoute from './routes/auth';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1/staging', authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
