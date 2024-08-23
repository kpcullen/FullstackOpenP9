interface Props {
  total: number;
}

const Total = ({ total }: Props) => {
  return (
    <div>
      <hr />
      <p>Number of exercises {total}</p>
    </div>
  );
};

export default Total;
