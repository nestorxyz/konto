import Image from 'next/image';

const LandingFooter: React.FC = () => {
  return (
    <footer className="flex flex-col items-center bg-primary py-6">
      <div className="flex mb-2 items-center">
        <div className="w-12 lg:w-20">
          <Image
            src="/logo.svg"
            width="48.33"
            height="51.25"
            layout="responsive"
          />
        </div>
        <h2 className="font-bold text-white text-4xl ml-2 lg:text-5xl">
          Konto
        </h2>
      </div>
      <h3 className="font-bold text-white text-sm lg:text-2xl">
        Copyright © 2021 Somewhere in the metaverse{' '}
      </h3>
      <h3 className="text-white text-sm lg:text-2xl">
        Hecho con 💚 y ☕ por{' '}
        <a
          href="https://www.nestoredduardo.me/"
          target="_blank"
          className="css-e657no"
        >
          @nestoredduardo
        </a>
      </h3>
    </footer>
  );
};

export default LandingFooter;
