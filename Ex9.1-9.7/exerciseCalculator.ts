interface exerciseValues {
  targetHours: number;
  exerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): exerciseValues => {
  const values: string[] = args.slice(2);

  if (values.length < 2)
    throw new Error(
      'Too few arguments. First value should be target hours, second should be exercise hours!'
    );

  const targetHours: number = +values[0];
  if (isNaN(+targetHours)) {
    throw new Error('Target hours must be a number');
  }

  const exerciseHours: number[] = values.slice(1).map((value) => {
    const num = +value;
    if (isNaN(+num)) {
      throw new Error('Values must be numbers');
    }
    return num;
  });

  return {
    targetHours,
    exerciseHours,
  };
};

interface compareValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  targetHours: number,
  numHours: number[]
): compareValues => {
  const periodLength = numHours.length;

  const trainingDays = numHours.filter((num: number) => num > 0).length;

  const average = numHours.reduce((acc, num) => acc + num, 0) / numHours.length;

  const success = average >= targetHours;

  const daysAtTarget = numHours.filter((num) => num >= 2).length;

  let rating;
  let ratingDescription;
  if (daysAtTarget >= 4) {
    rating = 1;
    ratingDescription = 'Excellent job, 4 or more days you met your target';
  } else if (daysAtTarget > 2 && daysAtTarget < 4) {
    rating = 2;
    ratingDescription = 'Pretty good job, you met your target for 3 days';
  } else if (daysAtTarget <= 2) {
    rating = 3;
    ratingDescription = 'Pretty bad job, your met your target 2 days or less';
  } else throw new Error('Something went wrong calculating your rating');

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));

try {
  const { targetHours, exerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(targetHours, exerciseHours));
} catch (err: unknown) {
  let errMessage = 'Something went wrong';
  if (err instanceof Error) {
    errMessage += err.message;
  }
  console.log(errMessage);
}
