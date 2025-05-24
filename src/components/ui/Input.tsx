/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from 'tailwind-merge';
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { ReactNode, useState } from 'react';
interface IProps {
  type: string;
  name: string;
  onChange: (e: any) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  label?: string;
  value?: string | number;
  isPassword?: boolean
  icon?: ReactNode
  required?: boolean
}
const Input = ({ type, name, onChange, placeholder, error, className, label, value, isPassword, icon }: IProps) => {
  const [showPwd, setShowPwd] = useState<boolean>(false)
  return (
    <>
      <div>
        <div className='text-slate-700 text-sm font-semibold mb-1'>{label}</div>
        <div className='relative'>
          <input
          // disabled={disabled}
          // contentEditable={!disabled}
            type={showPwd ? 'text' : type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={twMerge(
              `w-full border ${error && 'border-red-500'
              } rounded-md outline-none ${icon ? 'px-8' : 'px-4 '} py-2 text-sm ${className}`
            )}
          />
          {
            icon && <div className='absolute top-2.5 left-2 text-slate-700 '>{icon}</div>
          }
          {
            isPassword && <div className='absolute top-2.5 right-3 cursor-pointer' onClick={() => setShowPwd(!showPwd)} >


              {
                showPwd ? <RxEyeOpen /> : <RxEyeClosed />
              }

            </div>
          }
        </div>


        {error && <div className='text-sm text-red-500'>{error}</div>}
      </div>
    </>
  );
};

export default Input;
