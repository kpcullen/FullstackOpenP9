import express, { Request, Response } from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
// import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack Open!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const height: number | undefined = req.query.height
    ? +req.query.height
    : undefined;
  const weight: number | undefined = req.query.weight
    ? +req.query.weight
    : undefined;

  if (!height || isNaN(height) || !weight || isNaN(weight)) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }
  const bmi: object = calculateBmi(height, weight);

  return res.status(200).send({ bmi });
});

app.post('/exercises', (req, res) => {
  interface ExerciseRequest {
    daily_exercises: number[];
    target: number;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: ExerciseRequest = req.body;

  const isArrayValid: boolean = daily_exercises.every(
    (item) => typeof item === 'number'
  );

  if (isNaN(+target) || !Array.isArray(daily_exercises) || !isArrayValid) {
    return res.status(400).send({ error: 'Malformatted parameters' });
  }

  if (!target || !daily_exercises) {
    return res.status(400).send({ error: 'Parameters missing' });
  }

  const result = calculateExercises(+target, daily_exercises);
  return res.status(200).send({ result });
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
