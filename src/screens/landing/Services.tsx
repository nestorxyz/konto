import Image from 'next/image';
import Link from 'next/link';

import disneyLogo from '@images/disney-logo.png';

const LandingServices: React.FC = () => {
  return (
    <section className="flex flex-col items-center py-6 lg:mt-10">
      <h2 className="text-2xl font-bold mb-6 lg:text-5xl lg:mb-10">
        Servicios disponibles
      </h2>
      <div className="flex flex-col items-center lg:flex-row">
        <div className="w-64 lg:w-96 lg:mr-10">
          <img src="/img/services/disney-logo.png" className="object-cover" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="mt-6 mb-4 text-lg font-medium lg:text-4xl lg:mb-8">
            Precio compartido en grupo
          </h3>
          <div className="mb-2 lg:mb-8">
            <h4 className="inline-block text-lg font-bold text-dark-form lg:text-4xl">
              <s>S/25.90</s>
            </h4>
            <h4 className="inline-block text-lg font-bold text-primary ml-4 lg:text-4xl">
              S/8.00 por mes
            </h4>
          </div>
          <h5 className="text-xs lg:text-2xl">Ahorras S/214 al año</h5>
          <Link href="/login">
            <a className="py-3 px-5 bg-secondary rounded-md m-6 text-center lg:w-52 lg:text-2xl">
              Registrarse
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingServices;
