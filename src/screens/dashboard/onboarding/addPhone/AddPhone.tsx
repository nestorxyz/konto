// Libraries
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Loading } from '@nextui-org/react';

// Types
import { User } from '@prisma/client';

// Hooks
import useUser from 'hooks/useUser';

// Request
import AxiosAddPhone from 'request/local_next/users/AxiosAddPhone';

const AddPhone: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { user, refreshUser } = useUser();

  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('El teléfono es requerido')
        .max(9, 'El teléfono debe tener 9 dígitos'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await AxiosAddPhone(user!.id, values.phone);
        await refreshUser();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <h2 className="text-gray-800 mx-auto mb-10">Agrega tu número</h2>
      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
        <Input
          underlined
          labelLeft="+51"
          placeholder="Ej. 989009435"
          color="primary"
          size="xl"
          type="tel"
          className="mb-1"
          name="phone"
          aria-label="Número de teléfono"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={
            formik.errors.phone && formik.touched.phone ? 'error' : 'default'
          }
          helperColor="error"
          helperText={
            formik.errors.phone && formik.touched.phone
              ? formik.errors.phone
              : ''
          }
        />

        <Button
          size="lg"
          className="mt-10"
          type="submit"
          disabled={!formik.isValid || loading}
        >
          {loading ? <Loading size="sm" color="primary" /> : 'Agregar número'}
        </Button>
      </form>
    </>
  );
};
export default AddPhone;
