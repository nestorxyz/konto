// Libraries
import Link from 'next/link';
import { useEffect } from 'react';

// Hooks
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Components
import LoginReusable from 'screens/login/LoginReusable';

const Login: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <div>
      <section className="flex flex-col lg:flex-row-reverse lg:min-h-screen">
        <header className="flex flex-col items-center py-4 bg-primary pb-8 lg:w-6/12 lg:justify-center ">
          <Link href="/">
            <a className="lg:hidden">
              <img src="/logo.svg" height="61.5" width="58" />
            </a>
          </Link>

          <h1 className="text-white text-3xl text-center pt-2 w-80 lg:text-5xl lg:w-3/4">
            <span className="text-secondary font-bold">Konto</span> te permite
            compartir suscripciones y{' '}
            <span className="text-secondary font-bold">ahorrar hasta 70%</span>
          </h1>
        </header>
        <main className="mx-12 my-4 flex flex-col items-center lg:w-6/12">
          <Link href="/">
            <a className="hidden items-center lg:flex mr-auto">
              <div className="w-16 lg:w-22">
                <img src="/logo.svg" />
              </div>
              <h1 className="text-primary font-bold text-4xl ml-2 lg:text-4xl">
                Konto
              </h1>
            </a>
          </Link>

          <LoginReusable showLogo={false} className="md:mt-8 lg:mt-12" />
        </main>
      </section>
    </div>
  );
};

export default Login;
