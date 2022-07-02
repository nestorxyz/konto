// Libraries
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { UserIcon } from '@heroicons/react/solid';
import { Avatar, Dropdown, Text } from '@nextui-org/react';

// Types
import { Dispatch, SetStateAction } from 'react';
import { GroupScreens } from '../../../pages/grupo/[groupId]';

// Hooks
import { useSession } from 'next-auth/react';
import { Key } from 'react';

interface IUserDropdownProps {
  setScreen: Dispatch<SetStateAction<keyof typeof GroupScreens>>;
  className?: string;
}

const UserDropdown: React.FC<IUserDropdownProps> = ({ setScreen }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleDropdownAction = (key: Key) => {
    if (key === 'sayhi') {
      toast.success('Qué compartirás hoy?', {
        position: 'top-center',
      });
    }
    if (key === 'home') {
      router.push('/');
    }
    if (key === 'logout') {
      signOut();
    }
    if (key === 'login') {
      setScreen('login');
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        {session?.user?.image ? (
          <Avatar
            bordered
            size="lg"
            as="button"
            color="secondary"
            src={session?.user?.image as string}
          />
        ) : (
          <Avatar
            bordered
            size="lg"
            as="button"
            icon={<UserIcon className="h-6 w-6 text-primary" />}
          />
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu
        color="secondary"
        aria-label="Avatar Actions"
        onAction={handleDropdownAction}
      >
        <Dropdown.Item key="sayhi" css={{ height: '$18' }}>
          <Text b color="inherit">
            Hola {session?.user?.name?.split(' ')[0]} !!!
          </Text>
        </Dropdown.Item>
        {status === 'unauthenticated' ? (
          <Dropdown.Item key="login" color="primary" withDivider>
            Iniciar Sesión
          </Dropdown.Item>
        ) : (
          <Dropdown.Item key="logout" color="error" withDivider>
            Cerrar Sesión
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
