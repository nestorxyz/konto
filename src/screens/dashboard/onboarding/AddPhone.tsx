// Libraries
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Input, Button, Loading } from '@nextui-org/react';

// Hooks
import useUser from 'hooks/useUser';

// Request
import AxiosAddPhone from 'request/local_next/users/AxiosAddPhone';
import AxiosSendVerificationCode from 'request/local_next/verificationCode/AxiosSendVerificationCode';

// Components
import OnboardingContainer from './OnboardingContainer';

const AddPhoneOnboarding: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const { user } = useUser();

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

  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('El teléfono es requerido'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await AxiosAddPhone(user!.id, values.phone);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  const formikVerifyPhone = useFormik({
    initialValues: {
      verificationCode: '',
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string().required(
        'El código de verificación es requerido'
      ),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const AddPhone: React.FC = () => {
    return (
      <>
        <h2 className="text-gray-800 mx-auto mb-10">Agrega tu número</h2>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
          <Input
            underlined
            placeholder="Ej. 989009435"
            color="primary"
            size="xl"
            type="tel"
            className="mb-6"
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
          <Button size="lg" type="submit" disabled={!formik.isValid || loading}>
            {loading ? <Loading size="sm" color="primary" /> : 'Agregar número'}
          </Button>
        </form>
      </>
    );
  };

  const VerifyPhone: React.FC = () => {
    return (
      <>
        <h2 className="text-gray-800 mx-auto mb-10 text-center">
          Ingresa el código que enviamos a tu WhatsApp
        </h2>
        <form
          onSubmit={formikVerifyPhone.handleSubmit}
          className="w-full flex flex-col"
        >
          <Input
            underlined
            placeholder="Ej. 989009435"
            color="primary"
            size="xl"
            type="tel"
            className="mb-6"
            name="phone"
            aria-label="Número de teléfono"
            value={formikVerifyPhone.values.verificationCode}
            onChange={formikVerifyPhone.handleChange}
            onBlur={formikVerifyPhone.handleBlur}
            status={
              formikVerifyPhone.errors.verificationCode &&
              formikVerifyPhone.touched.verificationCode
                ? 'error'
                : 'default'
            }
            helperColor="error"
            helperText={
              formikVerifyPhone.errors.verificationCode &&
              formikVerifyPhone.touched.verificationCode
                ? formikVerifyPhone.errors.verificationCode
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

          <Button
            size="lg"
            type="submit"
            disabled={!formikVerifyPhone.isValid || loading}
          >
            {loading ? (
              <Loading size="sm" color="primary" />
            ) : (
              'Verificar número'
            )}
          </Button>
        </form>
      </>
    );
  };

  return (
    <OnboardingContainer className="min-w-[320px] md:w-96 mt-8 mx-auto">
      {user && !user.phone && <AddPhone />}
      {user && !user.phoneVerified && <VerifyPhone />}
    </OnboardingContainer>
  );
};

export default AddPhoneOnboarding;
