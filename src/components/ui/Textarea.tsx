import { twMerge } from 'tailwind-merge';
interface IProps {
  name: string;
  onChange: (e: any) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  label?: string;
  value?: string | number;
}
const Textarea = ({ name, onChange, placeholder, error, className, label, value }: IProps) => {
  return (
    <>
      <div>
        <div className='text-slate-700 text-sm font-semibold mb-1'>{label}</div>
        <textarea
          style={{ resize: 'none' }}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={twMerge(
            `w-full border ${
              error && 'border-red-500'
            } rounded-md outline-none py-2 px-4 text-sm ${className}`
          )}
        ></textarea>
        {error && <div className='text-sm text-red-500'>{error}</div>}
      </div>
    </>
  );
};

export default Textarea;
