interface Props {
  message: string;
}

const Notification = ({ message }: Props) => {
  if (!message) return null;
  return <div style={{ color: 'red' }}>{message}</div>;
};

export default Notification;
