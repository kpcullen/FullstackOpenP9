export interface bmiValues {
  value1: number;
  value2: number;
}

export const parseBmiArguments = (args: string[]): bmiValues => {
  if (args.length < 4)
    throw new Error('Must have at least 2 arguments (height and weight)');
  if (args.length > 4)
    throw new Error('Cannot have more than 2 arguments (height and weight)');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Values must be numbers!');
  }
};

export const calculateBmi = (height: number, weight: number) => {
  console.log(height, weight);
  const heightInMeters: number = height / 100;

  const bmi: number = weight / (heightInMeters * heightInMeters);

  let message;
  if (bmi < 25) message = 'Your BMI is normal';
  if (bmi >= 25 && bmi <= 29) message = 'Your BMI is overwight';
  if (bmi > 29) message = 'Your BMI is obese';

  return { height: heightInMeters, weight, bmi: message };
};

if (require.main === module) {
  try {
    const { value1, value2 } = parseBmiArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (err: unknown) {
    let errMessage = 'Something went wrong';
    if (err instanceof Error) {
      errMessage += `Error: ${err.message}`;
      console.log(errMessage);
    }
  }
}

export default {
  parseBmiArguments,
  calculateBmi,
};

// console.log(calculateBmi(180, 85));

// export default calculateBmi
