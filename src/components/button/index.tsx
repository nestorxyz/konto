// Libraries
import classNames from 'classnames';

enum ButtonType {
  superLight = 'superLight',
  light = 'light',
}

interface ILightButtonProps {
  type?: keyof typeof ButtonType;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const LightButton: React.FC<ILightButtonProps> = (props) => {
  const { type, className, children, onClick } = props;

  if (type === ButtonType.light) {
    return (
      <button
        className={classNames(
          className,
          'active:scale-95 hover:bg-gray-50 flex items-center active:bg-gray-200 rounded-lg gap-2 p-2 duration-500 cursor-pointer transition-all'
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={classNames(
        className,
        'active:scale-[0.8] p-2 duration-500 cursor-pointer transition-all'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LightButton;
