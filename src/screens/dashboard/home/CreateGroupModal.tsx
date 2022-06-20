// Libraries
import { Modal, Text } from '@nextui-org/react';

// Components
import SelectMenu, { TDropDownOptions } from 'components/inputs/SelectMenu';

interface ICreateGroupModalProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const CreateGroupModal: React.FC<ICreateGroupModalProps> = ({
  open,
  setOpen,
}) => {
  return (
    <Modal
      closeButton
      aria-labelledby="create-group"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>
        <Text size={18}> Crea un grupo de tu suscripción favorita</Text>
      </Modal.Header>
      <Modal.Body>
        <SelectMenu />
      </Modal.Body>
    </Modal>
  );
};

export default CreateGroupModal;
