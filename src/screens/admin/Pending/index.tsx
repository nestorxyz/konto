// Libraries
import useSWR from 'swr';

// Request
import AxiosGetAllUserGroups from 'request/local_next/admin/AxiosGetAllUserGroups';

const Pending: React.FC = () => {
  const { data, error } = useSWR(
    '/admin/getAllUserGroups',
    AxiosGetAllUserGroups
  );

  console.log(data);

  return <div>Pending</div>;
};

export default Pending;
