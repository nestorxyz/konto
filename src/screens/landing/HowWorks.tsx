import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import mobilePayments from '@img/landing/Mobile_payments.svg';
import newEntries from '@img/landing/New_entries.svg';
import onlineMedia from '@img/landing/online_media.svg';
import onlinePayments from '@img/landing/Online_payments.svg';
import referral from '@img/landing/referral.svg';
import teamPage from '@img/landing/Team_page.svg';

const LandingHowWorks: React.FC = () => {
  const selectedStyles =
    'text-2xl font-bold border-b-4 border-primary mx-4 lg:text-3xl lg:';
  const noSelectedStyles = 'text-2xl text-light-semi lg:text-3xl';
  const [select, setSelect] = useState('admin');

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
      <div className="my-6 lg:my-10 lg:mb-20">
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
        <ul className="flex flex-col lg:flex-row">
          <li className="flex flex-col items-center mb-6">
            <Image
              src="/img/landing/New_entries.svg"
              width="261"
              height="184"
            />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              1. Crea un grupo
            </h3>
          </li>
          <li className="flex flex-col items-center mb-6 w-64 lg:mx-16">
            <Image src="/img/landing/referral.svg" width="261" height="184" />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              2. Invita o acepta participantes
            </h3>
          </li>
          <li className="flex flex-col items-center mb-6">
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
        <ul className="flex flex-col lg:flex-row">
          <li className="flex flex-col items-center mb-6">
            <Image src="/img/landing/Team_page.svg" width="261" height="184" />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              1. Únete a un grupo
            </h3>
          </li>
          <li className="flex flex-col items-center mb-6 w-64 lg:mx-16">
            <Image
              src="/img/landing/Online_payments.svg"
              width="261"
              height="184"
            />
            <h3 className="font-bold text-2xl mb-9 text-center mt-10">
              2. Paga la cuota
            </h3>
          </li>
          <li className="flex flex-col items-center mb-6">
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
      <Link href="/registro">
        <a className="py-3 px-5 bg-secondary rounded-md m-2 font-bold lg:text-2xl ">
          EZPZ, Quiero registrarme
        </a>
      </Link>
    </section>
  );
};

export default LandingHowWorks;
