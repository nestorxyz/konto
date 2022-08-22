// Libraries
import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

// Types
import { Dispatch, SetStateAction } from 'react';
import { AdminPages } from 'screens/admin';

interface IHeaderProps {
  setScreen: Dispatch<SetStateAction<keyof typeof AdminPages>>;
}

type TPage = {
  name: string;
  page: keyof typeof AdminPages;
};

const pages: TPage[] = [
  {
    name: 'Integrantes',
    page: 'joiner',
  },
  {
    name: 'Depósitos',
    page: 'deposits',
  },
];

const Header: React.FC<IHeaderProps> = ({ setScreen }) => {
  return (
    <>
      <header className="flex py-6 mx-6 items-center lg:mx-20 xl:mx-28">
        <button
          onClick={() => setScreen('joiner')}
          className="flex items-center"
        >
          <img src="/logo.svg" width="58" height="61.5" />
          <p className="font-bold text-4xl text-primary ml-4">Konto</p>
        </button>
        <div className="hidden md:inline-flex md:gap-10 lg:gap-15 ml-auto mr-5">
          {pages.map((page) => {
            return (
              <Button
                key={page.name}
                size="xl"
                auto
                light
                onClick={() => setScreen(page.page)}
              >
                {page.name}
              </Button>
            );
          })}
        </div>

        <div className="ml-auto md:ml-0">
          <Button onClick={() => signOut()} color="error" ghost>
            Logout
          </Button>
        </div>
      </header>
      <div className="fixed backdrop-blur-sm z-10 pb-6 w-full flex justify-center bottom-0 md:hidden">
        <Button.Group size="xl">
          {pages.map((page) => {
            return (
              <Button key={page.name} onPress={() => setScreen(page.page)}>
                {page.name}
              </Button>
            );
          })}
        </Button.Group>
      </div>
    </>
  );
};

export default Header;
