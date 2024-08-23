import { useState } from 'react';
import { NewDiaryEntry, Visibility, Weather } from '../types';

interface Props {
  onSubmit: (newObj: NewDiaryEntry) => Promise<void>;
}

const visibilityOptions = Object.values(Visibility);

const weatherOptions = Object.values(Weather);

const AddEntry = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const handleEntrySubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ date, visibility, weather, comment });
    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value as Visibility);
  };

  const handleWeather = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(e.target.value as Weather);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleEntrySubmit}>
        <div>
          Date:
          <input type="date" value={date} onChange={handleDate} />
        </div>
        <fieldset>
          <legend>Visibility:</legend>
          {visibilityOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={handleVisibility}
              />
              {option}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Weather: </legend>
          {weatherOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={handleWeather}
              />
              {option}
            </label>
          ))}
        </fieldset>

        <div>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Submit entry</button>
      </form>
    </div>
  );
};

export default AddEntry;
