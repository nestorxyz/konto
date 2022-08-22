// Libraries
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Avatar, Dropdown, Text, Loading } from '@nextui-org/react';

// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Hooks
import { useSession } from 'next-auth/react';
import useApp from 'hooks/useApp';
import { Key } from 'react';

interface IUserDropdownProps {
  setScreen: Dispatch<SetStateAction<keyof typeof DashboardPages>>;
}

const UserDropdown: React.FC<IUserDropdownProps> = ({ setScreen }) => {
  const { data: session } = useSession();
  const { user } = useApp();

  const handleDropdownAction = (key: Key) => {
    if (key === 'sayhi') {
      toast.success('Qué compartirás hoy?', {
        position: 'top-center',
      });
    }
    if (key === 'logout') {
      signOut();
    }
    if (key === 'profile') {
      setScreen('profile');
    }
  };

  if (!user) return <Loading />;

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar
          bordered
          size="lg"
          as="button"
          color="secondary"
          {...(user.image !== null && {
            src: user.image,
          })}
          text={user.name!}
        />
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
        <Dropdown.Item key="profile">Mi perfil</Dropdown.Item>
        <Dropdown.Item key="logout" color="error" withDivider>
          Cerrar Sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
