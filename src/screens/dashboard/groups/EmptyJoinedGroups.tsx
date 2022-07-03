// Libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Link, Input, Button } from '@nextui-org/react';

// Types
import { Dispatch, SetStateAction } from 'react';
import { DashboardPages } from 'screens/dashboard';

// Helpers
import classNames from 'lib/classNames';

interface IEmptyJoinedGroupsProps {
  setScreen: Dispatch<SetStateAction<keyof typeof DashboardPages>>;
  className?: string;
}

const EmptyJoinedGroups: React.FC<IEmptyJoinedGroupsProps> = ({
  className,
  setScreen,
}) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      groupLink: '',
    },
    validationSchema: Yup.object({
      groupLink: Yup.string().required('Group link is required'),
    }),
    onSubmit: async (values) => {
      router.push(values.groupLink);
    },
  });

  return (
    <div className={classNames(className, 'flex flex-col text-center')}>
      <p className="text-lg">Aún no eres miembro de un grupo</p>
      <div>
        <Link
          block
          className="justify-center text-lg"
          onClick={() => setScreen('home')}
        >
          Encuentra grupos aquí
        </Link>
      </div>

      <p className="text-lg mb-2">
        O si te han invitado 🤩, pega el link del grupo aquí
      </p>

      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <Input
          clearable
          bordered
          color="primary"
          placeholder="https://www.kontope.com/grupo/..."
          name="groupLink"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.groupLink}
          status={
            formik.errors.groupLink && formik.touched.groupLink
              ? 'error'
              : 'default'
          }
          className="mb-4"
        />
        <div className="mx-auto">
          <Button auto ghost type="submit">
            Buscar grupo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmptyJoinedGroups;
