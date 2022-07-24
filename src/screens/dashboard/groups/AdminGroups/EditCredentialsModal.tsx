// Libraries
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Text, Button, Input, Spacer, Loading } from '@nextui-org/react';

// Types
import { AdminGroup } from 'request/prisma/userGroups/getAdminGroups';

// Hooks
import useAdminGroups from 'hooks/useAdminGroups';

// Request
import AxiosEditGroupCredentials from 'request/local_next/groups/AxiosEditGroupCredentials';

// Components
import ButtonLoadingContent from 'components/loaders/ButtonLoadingContent';

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
  const { refreshAdminGroups } = useAdminGroups();

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
      setLoading(true);

      const response = await AxiosEditGroupCredentials({
        groupId: adminGroup!.id,
        credentialEmail: values.credentialEmail,
        credentialPassword: values.credentialPassword,
      });

      if (response.success) {
        toast.success('Credenciales editadas correctamente');
        refreshAdminGroups();
        setLoading(false);
        handleClose();
      } else {
        toast.error('Error al editar las credenciales');
        setLoading(false);
      }
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
          <Button
            auto
            flat
            size="lg"
            color="error"
            onPress={handleClose}
            disabled={loading}
          >
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
              <ButtonLoadingContent>Guardando</ButtonLoadingContent>
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
