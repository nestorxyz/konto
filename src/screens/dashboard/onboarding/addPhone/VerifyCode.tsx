// Libraries
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Input, Button, Loading } from '@nextui-org/react';

// Hooks
import useUser from 'hooks/useUser';

// Request
import AxiosSendVerificationCode from 'request/local_next/verification/AxiosSendVerificationCode';
import AxiosValidatePhoneCode from 'request/local_next/verification/AxiosValidatePhoneCode';

const VerifyPhone: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const { user, refreshUser } = useUser();

  const formik = useFormik({
    initialValues: {
      verificationCode: '',
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string().required(
        'El código de verificación es requerido'
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const response = await AxiosValidatePhoneCode({
        userId: user!.id,
        code: values.verificationCode,
      });

      if (response) {
        refreshUser();
        toast.success('El número de teléfono ha sido verificado');
      } else {
        toast.error('El código de verificación es incorrecto');
      }
      setLoading(false);
    },
  });

  const handleSendCode = async () => {
    setSendingCode(true);
    try {
      await AxiosSendVerificationCode(user!.id as string);
      toast.success('Verification code sent');
    } catch (error) {
      toast.error('Error enviando el código de verificación');
    }
    setSendingCode(false);
  };

  return (
    <>
      <h2 className="text-gray-800 mx-auto mb-10 text-center">
        Ingresa el código que enviamos a tu WhatsApp
      </h2>
      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
        <Input
          underlined
          placeholder="Ej. 989009435"
          color="primary"
          size="xl"
          type="text"
          className="mb-6"
          id="verificationCode"
          name="verificationCode"
          aria-label="Código de verificación"
          value={formik.values.verificationCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={
            formik.errors.verificationCode && formik.touched.verificationCode
              ? 'error'
              : 'default'
          }
          helperColor="error"
          helperText={
            formik.errors.verificationCode && formik.touched.verificationCode
              ? formik.errors.verificationCode
              : ''
          }
        />
        <div className="flex mb-6 justify-end">
          <Button
            color="success"
            auto
            size="sm"
            className="w-fit"
            onClick={handleSendCode}
          >
            {sendingCode ? 'Enviando...' : 'Enviar código'}
          </Button>
        </div>

        <Button size="lg" type="submit" disabled={!formik.isValid || loading}>
          {loading ? <Loading size="sm" color="primary" /> : 'Verificar número'}
        </Button>
      </form>
    </>
  );
};

export default VerifyPhone;
