import disneyImage from '@public/img/services/disney.png';
import hboImage from '@public/img/services/hbo.jpg';
import netflixImage from '@public/img/services/netflix.png';
import crunchyrollImage from '@public/img/services/crunchyroll.jpg';
import googleIcon from '@public/icons/google.svg';
import facebookIcon from '@public/icons/facebook.svg';
import yapeIcon from '@public/img/payment/yape.png';

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

export const mapServiceToImage = (service: string) => {
  switch (service) {
    case 'disney':
      return disneyImage;
    case 'hbo':
      return hboImage;
    case 'netflix':
      return netflixImage;
    case 'crunchyroll':
      return crunchyrollImage;
    case 'Google':
      return googleIcon;
    case 'Facebook':
      return facebookIcon;
    case 'yape':
      return yapeIcon;
    default:
      return disneyImage;
  }
};

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
