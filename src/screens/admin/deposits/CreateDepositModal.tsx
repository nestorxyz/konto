// Libraries
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Modal, Input, Button } from '@nextui-org/react';

// Types
import { PaymentMethod } from 'request/prisma/paymentMethod/getAllPaymentMethods';

// Request
import AxiosCreateDeposit from 'request/local_next/admin/AxiosCreateDeposit';

// Components
import PaymentMethodOptions from 'components/inputs/PaymentMethodOptions';

interface ICreateDepositModalProps {
  paymentMethods: Array<PaymentMethod>;
  showDepositModal: boolean;
  setShowDepositModal: (showDepositModal: boolean) => void;
}

const CreateDepositModal: React.FC<ICreateDepositModalProps> = (props) => {
  const { paymentMethods, showDepositModal, setShowDepositModal } = props;

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>(paymentMethods[0]);

  useEffect(() => {
    formik.setFieldValue('paymentMethodId', selectedPaymentMethod.id);
  }, [paymentMethods]);

  const formik = useFormik({
    initialValues: {
      paymentMethodId: selectedPaymentMethod.id,
      amount: 0,
      userId: '',
      keyInfo: '',
    },
    validationSchema: Yup.object({
      paymentMethodId: Yup.string().required('Seleccione un método de pago'),
      amount: Yup.number().required('Ingrese una cantidad'),
      userId: Yup.string().required('Seleccione un usuario'),
      keyInfo: Yup.string().required('Ingrese una información clave'),
    }),
    onSubmit: async (values) => {
      const { paymentMethodId, amount, userId, keyInfo } = values;

      const response = await AxiosCreateDeposit({
        paymentMethodId,
        amount,
        userId,
        keyInfo,
      });

      if (response === true) {
        setShowDepositModal(false);
        toast.success('Depósito creado');
      } else {
        toast.error('Error creando depósito');
      }
    },
  });

  return (
    <Modal
      closeButton
      aria-labelledby="agregar-deposito"
      open={showDepositModal}
      onClose={() => setShowDepositModal(false)}
      width="500px"
    >
      <Modal.Body>
        <p className="text-3xl mb-0 font-semibold text-gray-700 border-b-2 pb-4">
          Crear depósito
        </p>
        <Input
          bordered
          label="Monto"
          color="primary"
          type="number"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <PaymentMethodOptions
          paymentMethods={paymentMethods}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
        <Input
          bordered
          label="Usuario"
          color="primary"
          name="userId"
          value={formik.values.userId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          bordered
          label="Info clave"
          color="primary"
          name="keyInfo"
          value={formik.values.keyInfo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Button
          size="lg"
          className="mt-6"
          onClick={() => formik.handleSubmit()}
        >
          {formik.isSubmitting ? 'Enviando información...' : 'Crear depósito'}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CreateDepositModal;
