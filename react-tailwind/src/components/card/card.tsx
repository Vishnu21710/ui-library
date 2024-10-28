import React from 'react'
import { clsx } from '../../utils/clsx'

type Props = {
    children: React.ReactNode,
    className?: string
}

const Card = ({ children, className }: Props) => {
    return (
        <div className={clsx('border border-gray-300 rounded-[8px] p-6 min-w-[20rem]', className)}>
            {children}
        </div>
    )
}

export const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={clsx('space-y-2', className)}>
            {children}
        </div>
    )
}


export const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <h3 className={clsx('text-3xl font-bold text-gray-800  leading-5', className)}>{children}</h3>
    )
}

export const CardDesciription = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className='text-gray-500/70 tracking-tight text-[15px]'>
            {children}
        </p>
    )
} 

export const CardBody = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={clsx('mt-6', className)}>
            {children}
        </div>
    )
} 

export default Card