// Libraries
import Link from 'next/link';

interface IInfoLayoutProps {
  children?: React.ReactNode;
}

const InfoLayout: React.FC<IInfoLayoutProps> = ({ children }) => {
  return (
    <div>
      <section className="flex flex-col lg:flex-row-reverse lg:min-h-screen">
        <header className="flex flex-col items-center py-4 bg-primary pb-8 lg:w-6/12 lg:justify-center ">
          <Link href="/">
            <a className="lg:hidden">
              <img src="/logo.svg" height="61.5" width="58" />
            </a>
          </Link>

          <p className="text-white text-3xl text-center pt-2 w-80 lg:text-5xl lg:w-3/4">
            <span className="text-secondary font-bold">Konto</span> te permite
            compartir suscripciones y{' '}
            <span className="text-secondary font-bold">ahorrar hasta 70%</span>
          </p>
        </header>
        <main className="mx-12 my-4 flex flex-col items-center lg:w-6/12">
          <Link href="/">
            <a className="hidden items-center lg:flex mr-auto">
              <div className="w-16 lg:w-22">
                <img src="/logo.svg" />
              </div>
              <p className="text-primary font-bold text-4xl ml-2 lg:text-4xl">
                Konto
              </p>
            </a>
          </Link>

          {children}
        </main>
      </section>
    </div>
  );
};

export default InfoLayout;
