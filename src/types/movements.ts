import { TransactionStatus } from '@prisma/client';

export type DepositMovement = {
  id: string;
  movementType: 'DEPOSIT';
  amount: number;
  status: keyof typeof TransactionStatus;
  updatedAt: Date;
};
export type WithdrawalMovement = {
  id: string;
  movementType: 'WITHDRAWAL';
  amount: number;
  status: keyof typeof TransactionStatus;
  updatedAt: Date;
};
export type InvoiceMovement = {
  id: string;
  movementType: 'INVOICE';
  updatedAt: Date;
  transfer: {
    id: string;
    amount: number;
    status: keyof typeof TransactionStatus;
    updatedAt: Date;
  };
  subscription: {
    id: string;
    group: {
      id: string;
      admin: {
        id: string;
        name: string;
      };
      plan: {
        id: string;
        adminGet: boolean;
        service: {
          id: string;
          name: string;
        };
      };
    };
  };
};
export type PaymentOrderMovement = {
  id: string;
  movementType: 'PAYMENT_ORDER';
  paymentDate: Date;
  transfer: {
    id: string;
    amount: number;
    status: keyof typeof TransactionStatus;
    updatedAt: Date;
  };
  updatedAt: Date;
  subscription: {
    id: string;
    user: {
      id: string;
      name: string;
      image: string;
    };
    group: {
      id: string;
      admin: {
        id: string;
        name: string;
      };
      plan: {
        id: string;
        adminGet: number;
        service: {
          id: string;
          name: string;
        };
      };
    };
  };
};

export type UserMovement =
  | DepositMovement
  | WithdrawalMovement
  | InvoiceMovement
  | PaymentOrderMovement;

export const isDeposit = (
  movement: UserMovement
): movement is DepositMovement => {
  return (<DepositMovement>movement).movementType === 'DEPOSIT';
};

export const isWithdrawal = (
  movement: UserMovement
): movement is WithdrawalMovement => {
  return (<WithdrawalMovement>movement).movementType === 'WITHDRAWAL';
};

export const isInvoice = (
  movement: UserMovement
): movement is InvoiceMovement => {
  return (<InvoiceMovement>movement).movementType === 'INVOICE';
};

export const isPaymentOrder = (
  movement: UserMovement
): movement is PaymentOrderMovement => {
  return (<PaymentOrderMovement>movement).movementType === 'PAYMENT_ORDER';
};
