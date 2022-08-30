// Static files
import disneyImage from '@public/img/services/disney.png';
import hboImage from '@public/img/services/hbo.jpg';
import netflixImage from '@public/img/services/netflix.png';
import crunchyrollImage from '@public/img/services/crunchyroll.jpg';
import googleIcon from '@public/icons/google.svg';
import facebookIcon from '@public/icons/facebook.svg';
import bbvaImage from '@public/img/payment/bbva.png';
import bcpImage from '@public/img/payment/bcp.jpg';
import interbankImage from '@public/img/payment/interbank.png';
import yapeImage from '@public/img/payment/yape.png';

// Disney + Files
import disney from '@public/img/shows/disney/disney/disney.png';
import frozen from '@public/img/shows/disney/disney/frozen.jpg';
import jungleCruise from '@public/img/shows/disney/disney/jungle-cruise.jpg';
import moana from '@public/img/shows/disney/disney/moana.jpg';
import raya from '@public/img/shows/disney/disney/raya.jpg';
import marvel from '@public/img/shows/disney/marvel/marvel.png';
import civilWar from '@public/img/shows/disney/marvel/civil-war.jpg';
import doctor from '@public/img/shows/disney/marvel/doctor.jpg';
import endgame from '@public/img/shows/disney/marvel/endgame.jpg';
import loki from '@public/img/shows/disney/marvel/loki.jpg';
import pixar from '@public/img/shows/disney/pixar/pixar.png';
import coco from '@public/img/shows/disney/pixar/coco.jpg';
import lightyear from '@public/img/shows/disney/pixar/lightyear.jpg';
import monsterInc from '@public/img/shows/disney/pixar/monsters-inc.jpg';
import toyStory from '@public/img/shows/disney/pixar/toy-story.jpg';
import startWars from '@public/img/shows/disney/star-wars/star-wars.png';
import ascenso from '@public/img/shows/disney/star-wars/ascenso.jpg';
import mandalorian from '@public/img/shows/disney/star-wars/mandalorian.jpg';
import obiWan from '@public/img/shows/disney/star-wars/obi-wan.jpg';
import rogue from '@public/img/shows/disney/star-wars/rogue.jpg';

// Types
import { ServiceSupply } from '@prisma/client';

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
    case 'BBVA':
      return bbvaImage;
    case 'BCP':
      return bcpImage;
    case 'INTERBANK':
      return interbankImage;
    case 'YAPE':
      return yapeImage;
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

export const getServiceInformation = (service: keyof typeof ServiceSupply) => {
  switch (service) {
    default:
      return {
        name: 'Disney +',
        image: disneyImage,
        images: [
          {
            companyImage: disney,
            animationUrl: '/img/shows/disney/disney/disney.mp4',
            shows: [frozen, jungleCruise, moana, raya],
          },
          {
            companyImage: marvel,
            animationUrl: '/img/shows/disney/marvel/marvel.mp4',
            shows: [civilWar, doctor, endgame, loki],
          },
          {
            companyImage: pixar,
            animationUrl: '/img/shows/disney/pixar/pixar.mp4',
            shows: [coco, lightyear, monsterInc, toyStory],
          },
          {
            companyImage: startWars,
            animationUrl: '/img/shows/disney/star-wars/star-wars.mp4',
            shows: [ascenso, mandalorian, obiWan, rogue],
          },
        ],
      };
  }
};
