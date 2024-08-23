import axios from 'axios';
import { baseUrl } from '../constants';
import { DiaryEntry, NewDiaryEntry } from '../types';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}`);
  return data;
};

const create = async (newObj: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${baseUrl}`, newObj);
  return data;
};

export default {
  getAll,
  create,
};
