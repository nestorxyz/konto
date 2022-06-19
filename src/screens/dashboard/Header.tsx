import Link from 'next/link';

// Hooks
import { useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="flex m-6 items-center lg:mx-12 xl:mx-24">
      <Link href="/home">
        <a className="flex items-center">
          <img src="/logo.svg" width="58" height="61.5" />
          <h1 className="font-bold text-4xl text-primary ml-4">Konto</h1>
        </a>
      </Link>
      <Link href="/mygroups">
        <a className="hidden font-bold text-2xl text-gray-700 ml-auto md:block">
          Mis Grupos
        </a>
      </Link>
      <Link href="/wallet">
        <a className="hidden font-bold text-2xl text-gray-700 mr-16 ml-28 md:block">
          Wallet
        </a>
      </Link>

      <div className="hidden md:flex items-center relative flex-col">
        <img
          src={session?.user?.image as string}
          width="35"
          height="35"
          className="rounded-full cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
