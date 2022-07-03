// Libraries
import Link from 'next/link';
import Image from 'next/image';
import { signIn, getProviders } from 'next-auth/react';

// Types
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

// Hooks
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Components
import LoginReusable from 'screens/login/LoginReusable';

interface ILoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const Login: React.FC<ILoginProps> = ({ providers }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    router.push('/');
  }

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

          <LoginReusable
            providers={providers}
            showLogo={false}
            className="md:mt-8 lg:mt-12"
          />
        </main>
      </section>
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
