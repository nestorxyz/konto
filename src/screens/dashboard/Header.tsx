// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Hooks
import { useSession } from 'next-auth/react';

interface IHeaderProps {
  setScreen: Dispatch<SetStateAction<keyof typeof DashboardPages>>;
}

type TPage = {
  name: string;
  page: keyof typeof DashboardPages;
};

const pages: TPage[] = [
  {
    name: 'Home',
    page: 'home',
  },
  {
    name: 'Grupos',
    page: 'groups',
  },
  {
    name: 'Wallet',
    page: 'wallet',
  },
];

const Header: React.FC<IHeaderProps> = ({ setScreen }) => {
  const { data: session } = useSession();

  return (
    <header className="flex m-6 items-center lg:mx-12 xl:mx-24">
      <button onClick={() => setScreen('home')}>
        <img src="/logo.svg" width="58" height="61.5" />
        <h1 className="font-bold text-4xl text-primary ml-4">Konto</h1>
      </button>
      {pages.map((page) => {
        return (
          <button
            className="hidden font-bold text-2xl text-gray-700 ml-auto md:block"
            onClick={() => setScreen(page.page)}
          >
            {page.name}
          </button>
        );
      })}

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
