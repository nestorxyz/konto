// Libraries
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '@nextui-org/react';

const LandingHowWorks: React.FC = () => {
  const selectedStyles =
    'text-2xl font-bold border-b-4 border-primary mx-4 lg:text-3xl lg:';
  const noSelectedStyles = 'text-2xl text-light-semi lg:text-3xl';
  const [select, setSelect] = useState('admin');
  const router = useRouter();

  const handleClick = () => {
    if (select === 'admin') {
      setSelect('joiner');
    } else {
      setSelect('admin');
    }
  };

  return (
    <section className="flex flex-col items-center mb-8 lg:mt-9">
      <h2 className="font-bold text-3xl lg:text-5xl">¿Cómo funciona?</h2>
      <div className="my-6 lg:my-10">
        <button
          className={
            select === 'admin'
              ? selectedStyles + ' lg:mr-60'
              : noSelectedStyles + ' lg:mr-60'
          }
          onClick={handleClick}
        >
          Admin
        </button>
        <button
          className={select === 'joiner' ? selectedStyles : noSelectedStyles}
          onClick={handleClick}
        >
          Joiner
        </button>
      </div>
      {select === 'admin' ? (
        <ul className="flex flex-col lg:flex-row gap-6">
          <li className="flex flex-col items-center">
            <Image
              src="/img/landing/New_entries.svg"
              width="261"
              height="184"
            />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              1. Crea un grupo
            </h3>
          </li>
          <li className="flex flex-col items-center w-64 lg:mx-16">
            <Image src="/img/landing/referral.svg" width="261" height="184" />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              2. Invita o acepta participantes
            </h3>
          </li>
          <li className="flex flex-col items-center">
            <Image
              src="/img/landing/Mobile_payments.svg"
              width="261"
              height="184"
            />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              3. Recibes las cuotas
            </h3>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col lg:flex-row gap-6">
          <li className="flex flex-col items-center">
            <Image src="/img/landing/Team_page.svg" width="261" height="184" />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              1. Únete a un grupo
            </h3>
          </li>
          <li className="flex flex-col items-center w-64 lg:mx-16">
            <Image
              src="/img/landing/Online_payments.svg"
              width="261"
              height="184"
            />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              2. Paga la cuota
            </h3>
          </li>
          <li className="flex flex-col items-center">
            <Image
              src="/img/landing/online_media.svg"
              width="261"
              height="184"
            />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              3. A disfrutar el servicio
            </h3>
          </li>
        </ul>
      )}
      <Button size="xl" color="secondary" onClick={() => router.push('/login')}>
        Quiero participar
      </Button>
    </section>
  );
};

export default LandingHowWorks;
