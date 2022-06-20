// Helpers
import classNames from 'lib/classNames';

interface ISelectMenuProps {
  options: TDropDownOptions[];
  value: TDropDownOptions;
  onChange: (option: TDropDownOptions) => void;
  className?: string;
}

export type TDropDownOptions = {
  textContent: string;
  value: string;
  defaultValue?: boolean;
};

const SelectMenu: React.FC<ISelectMenuProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <select
      id="location"
      name="location"
      className={classNames(
        className,
        'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
      )}
      defaultValue="Canada"
    >
      {options.map((option) => {
        return (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === value.value}
          >
            {option.textContent}
          </option>
        );
      })}
    </select>
  );
};

export default SelectMenu;
