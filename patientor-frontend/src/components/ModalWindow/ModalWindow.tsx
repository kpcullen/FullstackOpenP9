import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWindow = ({ modalOpen, onClose, children }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default ModalWindow;
