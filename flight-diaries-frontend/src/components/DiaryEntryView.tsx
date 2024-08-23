import { DiaryEntry } from '../types';

interface Props {
  diary: DiaryEntry;
}

const DiaryEntryView = ({ diary }: Props) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>Visibility: {diary.visibility}</div>
      <div>Weather:{diary.weather}</div>
      <div>
        Comments: <em>{diary.comment}</em>
      </div>
    </div>
  );
};

export default DiaryEntryView;
