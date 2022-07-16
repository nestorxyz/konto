// Types
import { NextPage, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/react';

// Request
import getUserGroup, {
  UserGroup,
} from 'request/prisma/userGroups/getUserGroup';
import sendValidatePaymentEmail from 'request/prisma/emails/sendValidatePaymentEmail';

// Components
import InfoLayout from 'components/layouts/InfoLayout';

interface IPayPageProps {
  userGroup: UserGroup;
}

export enum GroupScreens {
  group = 'group',
  login = 'login',
}

const PayPage: NextPage<IPayPageProps> = ({ userGroup }) => {
  const router = useRouter();

  return (
    <InfoLayout>
      <div className="flex md:mt-8 lg:mt-12 flex-col items-center justify-center lg:justify-start flex-1 px-4">
        <p className="text-gray-700 text-center text-4xl font-bold mb-4">
          Hola {userGroup?.user.name?.split(' ')[0]}, estamos validando tu pago{' '}
        </p>
        <p className="text-gray-600 font-medium text-center mb-10">
          Nos emociona que compres{' '}
          <span className="text-primary">
            {userGroup?.group.plan.service.name}
          </span>{' '}
          en grupo. Te informaremos cuando validemos tu pago 😉.
        </p>
        <div className="flex flex-col gap-4">
          <Button size="xl" onClick={() => router.push('/')}>
            Ir al Home
          </Button>
        </div>
      </div>
    </InfoLayout>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { userGroupId } = query;

  const userGroup = await getUserGroup(userGroupId as string);

  if (userGroup?.state === 'PENDING') {
    sendValidatePaymentEmail(userGroup);
  }

  return {
    props: { userGroup },
  };
};

export default PayPage;
