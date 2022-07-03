// Libraries
import { useRouter } from 'next/router';

// Components
import { Button } from '@nextui-org/react';

const LandingHeader: React.FC = () => {
  const router = useRouter();

  return (
    <header className="flex flex-col items-center py-4 bg-primary pb-12">
      <nav className="flex w-11/12 items-center">
        <div className="w-16 lg:w-22">
          <img src="/logo.svg" />
        </div>
        <h1 className="text-white font-bold text-4xl ml-2 lg:text-4xl">
          Konto
        </h1>

        <div className="ml-auto border border-white rounded-xl bg-white">
          <Button
            size="lg"
            light
            color="primary"
            onPress={() => router.push('/login')}
          >
            Ingresar
          </Button>
        </div>
      </nav>
      <div className="lg:flex lg:items-center lg:ml-16">
        <h2 className="text-white text-4xl text-center pt-11 lg:text-4xl xl:text-7xl lg:w-1/2">
          Sé parte de <span className="text-secondary font-bold">Konto</span> y{' '}
          <span className="text-secondary font-bold">Ahorra 70%</span> en tus
          Suscripciones
        </h2>

        <div className="hidden md:block">
          <img
            src="/img/landing/landing-preview.png"
            width="814"
            height="591"
          />
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
