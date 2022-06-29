export const referred_RegExp = new RegExp(/^[A-Za-z0-9]{7,8}$/);

export const randomString_v2 = (quantity: number) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  const characters: Array<string> = [];

  for (let i = 0; i < quantity; i++) {
    if (i % 2 === 0) {
      const randomIndexLetter = Math.floor(Math.random() * letters.length);

      characters.push(letters[randomIndexLetter]);
      continue;
    }

    const randomIndexNumber = Math.floor(Math.random() * numbers.length);

    characters.push(numbers[randomIndexNumber]);
  }

  return characters.join('');
};
