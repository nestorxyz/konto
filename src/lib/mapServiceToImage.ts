const mapServiceToImage = (service: string) => {
  switch (service) {
    case 'disney':
      return '/img/services/disney.png';
    case 'hbo':
      return '/img/services/hbo.jpg';
    case 'netflix':
      return '/img/services/netflix.png';
    case 'crunchyroll':
      return '/img/services/crunchyroll.jpg';
    case 'Google':
      return '/icons/google.svg';
    case 'Facebook':
      return '/icons/facebook.svg';
    default:
      return '/img/services/disney.png';
  }
};

export default mapServiceToImage;
