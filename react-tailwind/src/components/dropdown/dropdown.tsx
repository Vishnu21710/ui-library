import React, { useEffect, useRef, useState } from 'react'
import { clsx } from '../../utils/clsx'
import { GoChevronUp } from 'react-icons/go';
type Props = {
    dropdownWidth?: number,
    children?: React.ReactNode,
    size?: "xs" | "sm" | "lg" | "md" | "xl" | "xxl",
    className?: string,
    variant?: "danger" | "primary" | "secondary" | "success" | "alert"
}

const Dropdown = ({ dropdownWidth = 10, children, className, variant }: Props) => {
    const [isOpen, setisOpen] = useState(false)

    let color = "bg-blue-500"

    switch (variant) {
        case "danger":
            color = "bg-red-500 focus:ring-red-400/70"
            break;
        case "alert":
            color = "bg-yellow-500 focus:ring-yellow-400/70"
            break;
        case "secondary":
            color = "bg-gray-500 focus:ring-gray-400/70"
            break;
        case "success":
            color = "bg-green-500 focus:ring-green-400/70"
            break;
        default:
            color = "bg-blue-500 focus:ring-blue-400/70"
            break;
    }

    const toggleDropdown = () => {
        setisOpen(!isOpen)
    }

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (isOpen && !dropdownRef?.current?.contains(e.target as Node)) {
                setisOpen(false)
            }
        }

        window.addEventListener("mousedown", closeDropdown)

        return () => {
            window.removeEventListener("mousedown", closeDropdown)
        }
    }, [isOpen])

    return (
        <div className='relative z-20' ref={dropdownRef} >
            <button onClick={toggleDropdown} className={clsx(` rounded-md p-2 shadow-md shadow-blue-100 focus:ring-4 text-sm text-white`, color)}>
                <span className='flex items-center gap-x-4'>Actions <GoChevronUp size={20} className={clsx(!isOpen ? "rotate-180 " : "rotate-0", "transition", className)} /></span>
            </button>
            <div style={{ transformOrigin: "top" }} className={clsx(`absolute bg-white z-20 top-12 right-0 border rounded-md shadow-md  `, isOpen ? "scale-y-100 transition opacity-100" : "scale-y-0 opacity-0 ", dropdownWidth ? `w-[${dropdownWidth}rem]` : "w-[10rem]")}>
                {children
                    ?
                    children
                    :
                    (<div className='flex flex-col  w-full'>
                        <button className='hover:bg-gray-100/40 p-2  '>Action 1</button>
                        <button className='hover:bg-gray-100/40 p-2 '>Action 2</button>
                        <button className='hover:bg-gray-100/40 p-2 '>Action 3</button>
                    </div>)}
            </div>
        </div>
    )
}

export default Dropdown