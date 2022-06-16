// Components
import { Dropdown, Avatar, Text } from '@nextui-org/react';
import { UserIcon } from 'components/icons/UserIcon';

interface IUserMenuProps {
  className?: string;
}

const UserMenu: React.FC<IUserMenuProps> = ({ className }) => {
  return (
    <div className={className}>
      <Dropdown placement="bottom-left">
        <Dropdown.Trigger>
          <Avatar
            bordered
            size="lg"
            as="button"
            icon={<UserIcon size={20} fill="currentColor" />}
          />
        </Dropdown.Trigger>
        <Dropdown.Menu color="primary" aria-label="Avatar Actions">
          <Dropdown.Item key="profile" css={{ height: '$18' }}>
            <Text b color="inherit" css={{ d: 'flex' }}>
              Signed in as
            </Text>
            <Text b color="inherit" css={{ d: 'flex' }}>
              zoey@example.com
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="settings" withDivider>
            My Settings
          </Dropdown.Item>
          <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
          <Dropdown.Item key="analytics" withDivider>
            Analytics
          </Dropdown.Item>
          <Dropdown.Item key="system">System</Dropdown.Item>
          <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
          <Dropdown.Item key="help_and_feedback" withDivider>
            Help & Feedback
          </Dropdown.Item>
          <Dropdown.Item key="logout" color="error" withDivider>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
