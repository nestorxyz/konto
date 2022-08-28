// Libraries
import classNames from 'classnames';
import { FiChevronLeft, FiShare } from 'react-icons/fi';

// Components
import Button from 'components/button';

interface IMobileNavbarProps {
  className?: string;
}

const MobileNavbar: React.FC<IMobileNavbarProps> = (props) => {
  const { className } = props;

  return (
    <div
      className={classNames(
        className,
        'py-3 justify-between flex px-5 text-black'
      )}
    >
      <div className="flex items-center">
        <Button>
          <FiChevronLeft className="text-lg" />
        </Button>
        <span>Grupos · Konto</span>
      </div>
      <Button type="light">
        <FiShare className="text-base" />
        <span>Compartir</span>
      </Button>
    </div>
  );
};

export default MobileNavbar;
