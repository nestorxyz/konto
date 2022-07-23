// Libraries
import { useState } from 'react';
import {
  Modal,
  Text,
  Radio,
  Progress,
  Button,
  Input,
  Spacer,
  Loading,
} from '@nextui-org/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Types
import { AdminGroup } from 'request/prisma/userGroups/getAdminGroups';

interface IEditCredentialsModalProps {
  adminGroup: AdminGroup | null;
  initialValues: {
    credentialEmail: string;
    credentialPassword: string;
  };
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const EditCredentialsModal: React.FC<IEditCredentialsModalProps> = ({
  adminGroup,
  initialValues,
  open,
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);

  const editCredentialFormik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: Yup.object({
      credentialEmail: Yup.string()
        .email('El correo es inválido')
        .required('El correo es requerido'),
      credentialPassword: Yup.string().required('La contraseña es requerida'),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleClose = () => {
    editCredentialFormik.resetForm();
    setOpen(false);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="edit-credentials"
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>
        <Text size={20} color="primary" weight="bold">
          Editar credenciales
        </Text>
      </Modal.Header>
      <form onSubmit={editCredentialFormik.handleSubmit} autoComplete="off">
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: 'none' }}
        />
        <Modal.Body>
          <Input
            label="Correo"
            clearable
            size="xl"
            color="primary"
            name="credentialEmail"
            value={editCredentialFormik.values.credentialEmail}
            onChange={editCredentialFormik.handleChange}
            onBlur={editCredentialFormik.handleBlur}
            status={
              editCredentialFormik.errors.credentialEmail &&
              editCredentialFormik.touched.credentialEmail
                ? 'error'
                : 'default'
            }
            helperColor="error"
            helperText={
              editCredentialFormik.errors.credentialEmail &&
              editCredentialFormik.touched.credentialEmail
                ? editCredentialFormik.errors.credentialEmail
                : ''
            }
          />
          <Spacer y={0.1} />
          <Input.Password
            label="Contraseña"
            size="xl"
            color="primary"
            name="credentialPassword"
            value={editCredentialFormik.values.credentialPassword}
            onChange={editCredentialFormik.handleChange}
            onBlur={editCredentialFormik.handleBlur}
            status={
              editCredentialFormik.errors.credentialPassword &&
              editCredentialFormik.touched.credentialPassword
                ? 'error'
                : 'default'
            }
            helperColor="error"
            helperText={
              editCredentialFormik.errors.credentialPassword &&
              editCredentialFormik.touched.credentialPassword
                ? editCredentialFormik.errors.credentialPassword
                : ''
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat size="lg" color="error" onPress={handleClose}>
            Cancelar
          </Button>
          <Button
            auto
            size="lg"
            type="submit"
            color="primary"
            disabled={
              !editCredentialFormik.isValid ||
              loading ||
              !editCredentialFormik.dirty
            }
          >
            {loading ? (
              <Loading size="sm" color="primary" />
            ) : (
              'Guardar cambios'
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditCredentialsModal;
