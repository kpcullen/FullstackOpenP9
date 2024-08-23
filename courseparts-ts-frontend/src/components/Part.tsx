import { assertNever } from '../helpers';
import { CoursePart } from '../types';

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <p>
            <em>{part.description}</em>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p>Group Project Count: {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <p>
            <em>{part.description}</em>
          </p>
          <p>Submit to: {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <em>{part.description}</em>
          <p>Required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
