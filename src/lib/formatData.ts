export const formatDate = (date: Date): string => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return newDate.toLocaleDateString('en-ES', options);
};
