// Libraries
import useSWR, { useSWRConfig } from 'swr';

// Request
import AxiosGetAdminGroups, {
  IGetAdminGroupsResponse,
} from 'request/local_next/userGroups/AxiosGetAdminGroups';

// Hooks
import useUser from 'hooks/useUser';

const useAdminGroups = () => {
  const { user } = useUser();
  const { mutate } = useSWRConfig();
  const { data: response, error } = useSWR(
    ['/userGroups/getAdminGroups', user.id],
    AxiosGetAdminGroups
  );

  const refreshAdminGroups = () =>
    mutate(['/userGroups/getAdminGroups', user.id]);

  return {
    adminGroups: response && (response as IGetAdminGroupsResponse).data,
    loading: !error && !response,
    error: error,
    refreshAdminGroups,
  };
};

export default useAdminGroups;
