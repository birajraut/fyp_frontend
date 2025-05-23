import { twMerge } from 'tailwind-merge'
import { ReactNode } from 'react';

interface IProps {
    type: 'submit' | 'button'
    label: string | any
    className?: string
    loading?: boolean
    loadingLabel?: string
    onClick?: () => void
    icon?: ReactNode
    showIcon?:boolean
}
const CustomButton = ({ type, label, className, loading, loadingLabel, onClick, showIcon,  icon }: IProps) => {
    return (
        <>
            {
                loading ? <>
                    <div className={twMerge(` inline-block text-sm py-2 px-4 bg-purple-500 text-white rounded-md    ${className}`)}>{loadingLabel || 'Please Wait ...'}</div>

                </> : <button onClick={onClick} type={type} className={twMerge(` flex items-center gap-3 text-sm py-2 px-4 bg-purple-500 text-white rounded-md    ${className}`)}>
                    {
                        showIcon && <div>{icon}</div>
                    }
                    <div>{label}</div>
                </button>

            }

        </>
    )
}

export default CustomButton