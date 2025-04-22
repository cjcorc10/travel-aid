import clsx from 'clsx';

type componentProps = {
  onClick: () => void;
  state: boolean;
};
const Switch = ({ onClick, state }: componentProps) => {
  return (
    <div className="flex items-center mb-4">
      <div
        onClick={onClick}
        className={clsx(
          'relative h-7 w-11 rounded-full inline-flex items-center',
          state ? 'bg-green-600 outline-2 outline-green-300' : 'bg-gray-500'
        )}
      >
        <div
          className={clsx(
            'h-6 w-6 bg-gray-100 rounded-full transform transition-transform',
            state ? 'translate-x-0.5' : 'translate-x-4.5'
          )}
        ></div>
      </div>
      <p className={clsx('ml-2 text-gray-600', state && 'text-green-500')}>
        round trip
      </p>
    </div>
  );
};

export default Switch;
