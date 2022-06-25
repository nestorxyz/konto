// Libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSwr from 'swr';
import {
  Modal,
  Text,
  Radio,
  Progress,
  Button,
  Input,
  Spacer,
} from '@nextui-org/react';

// Request
import AxiosGetAllPlans from 'request/local_next/plans/AxiosGetAllPlans';
import { Plan } from 'request/prisma/plans/getAllPlans';

interface ICreateGroupModalProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const CreateGroupModal: React.FC<ICreateGroupModalProps> = ({
  open,
  setOpen,
}) => {
  const { data, error } = useSwr<Plan[]>('plans', AxiosGetAllPlans);

  const formik = useFormik({
    initialValues: {
      plan: data ? data[0].id : '',
    },
    validationSchema: Yup.object({
      plan: Yup.string().required('El plan es requerido'),
    }),
    onSubmit: async (values) => {
      console.log('values:', values);
      setOpen(false);
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

              <Input
                label="Correo de la cuenta"
                clearable
                size="xl"
                color="primary"
              />
              <Input.Password label="Contraseña" size="xl" color="primary" />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" color="primary">
            Crear
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateGroupModal;
