// Libraries
import { Loading } from '@nextui-org/react';

const PageLoading: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loading size="xl" />
    </div>
  );
};

export default PageLoading;
