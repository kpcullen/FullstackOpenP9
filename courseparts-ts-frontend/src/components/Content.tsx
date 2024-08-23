import { CoursePart } from '../types';
import Part from './Part';

interface Props {
  course: CoursePart[];
}

const Content = ({ course }: Props) => {
  return course.map((part) => (
    <div>
      <h3>
        {part.name} {part.exerciseCount}
      </h3>
      <Part part={part} />
    </div>
  ));
};

export default Content;
