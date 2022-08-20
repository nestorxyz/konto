// Libraries
import { signOut, getProviders } from 'next-auth/react';
import { Button } from '@nextui-org/react';

// Types
import { NextPage } from 'next';
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

// Hooks
import { useSession } from 'next-auth/react';
import useApp from 'hooks/useApp';

// Components
import PageLoading from 'components/loaders/PageLoading';
import LoginReusable from 'screens/login/LoginReusable';
import AdminScreen from 'screens/admin';

interface IAdminProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const AdminPage: NextPage<IAdminProps> = ({ providers }) => {
  const { status } = useSession();
  const { user, userLoaded } = useApp();

  if (status !== 'unauthenticated') {
    if (!userLoaded) {
      return <PageLoading />;
    } else if (user.isAdmin) {
      return <AdminScreen />;
    } else {
      return (
        <div>
          <p>Acceso restringido</p>
          <Button onClick={() => signOut()}>Cerrar sesión</Button>
        </div>
      );
    }
  }

  return (
    <LoginReusable
      providers={providers}
      showLogo={false}
      className="md:mt-8 lg:mt-12"
    />
  );
};

export default AdminPage;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
