import { twMerge } from 'tailwind-merge'
import { ReactNode } from 'react'

interface IProps {
    label: string
    value: string | number
    icon?: ReactNode
    className?: string
}

const CustomCard = ({ label, value, icon, className }: IProps) => {
    return (
        <div className={twMerge(`flex items-center gap-4 overflow-scroll p-4 bg-purple-500 text-white rounded-lg shadow-lg ${className}`)}>
            {icon && <div>{icon}</div>}
            <div className="flex flex-col">
                <span className="text-sm ">{label}</span>
                <span className="text-2xl font-bold">{value}</span>
            </div>
        </div>
    )
}

export default CustomCard
