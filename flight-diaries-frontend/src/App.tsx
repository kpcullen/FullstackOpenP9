import { useEffect, useState } from 'react';
import diaryService from './services/diaries';
import { DiaryEntry, NewDiaryEntry } from './types';
import DiaryEntryView from './components/DiaryEntryView';
import AddEntry from './components/AddEntry';
import axios from 'axios';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaries();
  }, []);

  const newDiaryEntrySubmit = async (newObj: NewDiaryEntry) => {
    try {
      const addedEntry = await diaryService.create(newObj);
      setDiaries([...diaries, addedEntry]);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err?.response?.data && typeof err?.response?.data === 'string') {
          const message = err.response.data;
          console.log(message);
          setError(message);
          setTimeout(() => {
            setError('');
          }, 3000);
        } else {
          setError('Unrecognized error');
          setTimeout(() => {
            setError('');
          }, 3000);
        }
      } else {
        setError('Unknown error');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }
  };

  return (
    <div>
      <Notification message={error} />
      <AddEntry onSubmit={newDiaryEntrySubmit} />
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <DiaryEntryView diary={d} />
      ))}
    </div>
  );
};

export default App;
