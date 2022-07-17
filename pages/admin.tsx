// Libraries
import { signOut, getProviders } from 'next-auth/react';
import { Button } from '@nextui-org/react';

// Types
import { NextPage } from 'next';
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

// Hooks
import { useSession } from 'next-auth/react';
import useUser from 'hooks/useUser';

// Components
import PageLoading from 'components/loaders/PageLoading';
import LoginReusable from 'screens/login/LoginReusable';

interface IAdminProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const AdminPage: NextPage<IAdminProps> = ({ providers }) => {
  const { status } = useSession();
  const { user, loading } = useUser();

  if (loading) {
    return <PageLoading />;
  }

  if (status === 'authenticated' && !user.isAdmin) {
    return (
      <div>
        <p>Acceso restringido</p>
        <Button onClick={() => signOut()}>Cerrar sesión</Button>
      </div>
    );
  }

  if (status === 'authenticated' && user.isAdmin) {
    return <>Some admin content</>;
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
