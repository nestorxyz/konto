// Libraries
import classNames from 'classnames';
import { useRouter } from 'next/router';

// Types
import { Dispatch, SetStateAction } from 'react';
import { GroupScreens } from '../../../../pages/grupo/[groupId]';

// Components
import UserDropdown from '../UserDropdown';
import MobileNavbar from './MobileNavbar';

interface IGroupHeaderProps {
  setScreen: Dispatch<SetStateAction<keyof typeof GroupScreens>>;
  className?: string;
}

const GroupHeader: React.FC<IGroupHeaderProps> = ({ className, setScreen }) => {
  const router = useRouter();

  return (
    <>
      <header
        className={classNames(
          className,
          'flex p-6 items-center lg:px-12 xl:px-24 w-full'
        )}
      >
        <button onClick={() => router.push('/')} className="flex items-center">
          <img src="/logo.svg" width="58" height="61.5" />
          <p className="font-bold text-4xl text-primary ml-4">Konto</p>
        </button>

        <div className="ml-auto">
          <UserDropdown setScreen={setScreen} />
        </div>
      </header>
      <MobileNavbar className="md:hidden" />
    </>
  );
};

export default GroupHeader;
