// Libraries
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSwr from 'swr';
import toast from 'react-hot-toast';
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

// Types
import { Plan } from 'request/prisma/plans/getAllPlans';

// Hooks
import { useSession } from 'next-auth/react';

// Request
import AxiosGetAllPlans from 'request/local_next/plans/AxiosGetAllPlans';
import AxiosCreateGroup from 'request/local_next/groups/AxiosCreateGroup';

interface ICreateGroupModalProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const CreateGroupModal: React.FC<ICreateGroupModalProps> = ({
  open,
  setOpen,
}) => {
  const { data, error } = useSwr<Plan[]>('plans', AxiosGetAllPlans);
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      plan: data ? data[0].id : '',
      credentialEmail: '',
      credentialPassword: '',
    },
    validationSchema: Yup.object({
      plan: Yup.string().required('El plan es requerido'),
      credentialEmail: Yup.string()
        .email('El correo es inválido')
        .required('El correo es requerido'),
      credentialPassword: Yup.string().required('La contraseña es requerida'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const { plan, credentialEmail, credentialPassword } = values;

      const result = await AxiosCreateGroup({
        adminId: session!.user!.id,
        planId: plan,
        credentialEmail,
        credentialPassword,
      });

      if (result.error) {
        setOpen(false);
        toast.error(result.error);
      } else {
        setOpen(false);
        toast.success('Grupo creado correctamente');
      }
      setLoading(false);
    },
  });

  return (
    <Modal
      closeButton
      aria-labelledby="create-group"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>
        <Text size={20} color="primary" weight="bold">
          {' '}
          Crea un grupo de tu suscripción favorita
        </Text>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          {!data && !error && (
            <Progress
              indeterminated
              value={50}
              color="primary"
              status="primary"
            />
          )}
          {data && (
            <>
              <Radio.Group
                label="Seleccciona un servicio"
                name="plan"
                onChange={(value) => formik.setFieldValue('plan', value)}
                onBlur={formik.handleBlur}
                value={formik.values.plan}
              >
                {data!.map((plan) => (
                  <Radio key={plan.id} size="sm" value={plan.id}>
                    {plan.service.name}
                  </Radio>
                ))}
              </Radio.Group>
              {formik.errors.plan && formik.touched.plan && (
                <Text color="error">{formik.errors.plan}</Text>
              )}
              {formik.values.plan && (
                <Text blockquote>
                  Número máximo de integrantes:{' '}
                  {
                    data.find((plan) => plan.id === formik.values.plan)
                      ?.maxUsers
                  }{' '}
                  <br />
                  Recibirás por integrante: S/
                  {
                    data.find((plan) => plan.id === formik.values.plan)
                      ?.adminGet
                  }
                </Text>
              )}
              <Spacer y={0.1} />

              <div className="flex items-center gap-1">
                <h5 className="mb-0">
                  Ingresa los datos de la cuenta que compartirás
                </h5>
              </div>

              <Input
                label="Correo"
                clearable
                size="xl"
                color="primary"
                name="credentialEmail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.credentialEmail}
                status={
                  formik.errors.credentialEmail &&
                  formik.touched.credentialEmail
                    ? 'error'
                    : 'default'
                }
                helperColor="error"
                helperText={
                  formik.errors.credentialEmail &&
                  formik.touched.credentialEmail
                    ? formik.errors.credentialEmail
                    : ''
                }
              />
              <Spacer y={0.1} />

              <Input.Password
                label="Contraseña"
                size="xl"
                color="primary"
                name="credentialPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.credentialPassword}
                status={
                  formik.errors.credentialPassword &&
                  formik.touched.credentialPassword
                    ? 'error'
                    : 'default'
                }
                helperColor="error"
                helperText={
                  formik.errors.credentialPassword &&
                  formik.touched.credentialPassword
                    ? formik.errors.credentialPassword
                    : ''
                }
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="lg"
            type="submit"
            color="primary"
            disabled={!formik.isValid || loading}
          >
            {loading ? <Loading size="sm" color="primary" /> : 'Crear grupo'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateGroupModal;
