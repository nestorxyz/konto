const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const formatDate = (date: Date): string => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return newDate.toLocaleDateString('es-ES', options);
};

export const dateDiffInDays = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / _MS_PER_DAY);

  return diffDays;
};

export const getFirstName = (name: string): string => {
  const names = name.split(' ');
  return names[0];
};

export const formatTransferInfo = (
  type: 'moneyIn' | 'moneyOut',
  amount: number
) => {
  if (type === 'moneyIn') {
    return `+ S/ ${amount}`;
  } else {
    return `- S/ ${amount}`;
  }
};
