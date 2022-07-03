// Types
import { AdminGroup } from 'request/prisma/userGroups/getAdminGroups';

interface IJoinedGroupsListProps {
  adminGroups: AdminGroup[];
}

const AdminGroupsList: React.FC<IJoinedGroupsListProps> = ({ adminGroups }) => {
  console.log(adminGroups);

  return (
    <div className="flex flex-col gap-4">
      {adminGroups.map((adminGroup) => {
        return (
          <div className="flex flex-col px-4 py-6 border rounded-md shadow-sm">
            {adminGroup.plan.service.name}
          </div>
        );
      })}
    </div>
  );
};

export default AdminGroupsList;
