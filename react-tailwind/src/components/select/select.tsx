// // 

// import React, { useEffect, useRef, useState, ReactNode } from 'react'
// import { GoChevronDown } from 'react-icons/go'
// import { clsx } from '../../utils/clsx'

// type SelectProps = {
//     label?: string
//     children: ReactNode
//     onChange?: (event: { target: { value: string } }) => void
//     value?: string // Controlled selected value
// }

// type OptionProps = {
//     value: string
//     children: ReactNode
// }

// const Select = ({ label = "Select an option", children, onChange, value }: SelectProps) => {
//     const [open, setOpen] = useState(false)
//     const [selectedItem, setSelectedItem] = useState(value || "")
//     const selectRef = useRef<HTMLDivElement>(null)

//     // Toggle dropdown visibility
//     const handleToggle = () => {
//         setOpen(!open)
//     }

//     // Handle item selection
//     const handleSelect = (value: string) => {
//         setSelectedItem(value)

//         // Trigger onChange with the expected event shape
//         onChange?.({ target: { value } })

//         setOpen(false)
//     }

//     // Close dropdown if clicked outside
//     useEffect(() => {
//         const closeDropdown = (e: MouseEvent) => {
//             if (open && !selectRef?.current?.contains(e.target as Node)) {
//                 setOpen(false)
//             }
//         }

//         window.addEventListener("mousedown", closeDropdown)
//         return () => window.removeEventListener("mousedown", closeDropdown)
//     }, [open])

//     // Sync selectedItem with the value prop if controlled
//     useEffect(() => {
//         if (value !== undefined) {
//             setSelectedItem(value)
//         }
//     }, [value])

//     return (
//         <div className='relative min-w-[10rem]' ref={selectRef}>
//             <button onClick={handleToggle} className={clsx('flex justify-between min-w-full border rounded-md items-center gap-x-3 p-2 cursor-pointer', open ? "ring-4 ring-gray-100/50" : "")}>
//                 <span className='text-sm'>{selectedItem || label}</span>
//                 <GoChevronDown className={clsx(open ? "rotate-180" : "rotate-0", "transition")} />
//             </button>
//             {(
//                 <div className={clsx('top-12 absolute w-full p-2 border rounded-md shadow-md flex flex-col gap-1 bg-white', open ? "scale-100 transition" : "scale-0")}>
//                     {React.Children.map(children, child => {
//                         if (React.isValidElement(child) && child.type === Option) {
//                             return React.cloneElement(child, {
//                                 onSelect: () => handleSelect(child.props.value)
//                             })
//                         }
//                         return child
//                     })}
//                 </div>
//             )}
//         </div>
//     )
// }

// const Option = ({ value, children, onSelect }: OptionProps & { onSelect?: () => void }) => {
//     return (
//         <button
//             onClick={onSelect}
//             className='hover:bg-gray-100/90 transition rounded-md p-2 text-sm w-full text-left'>
//             {children}
//         </button>
//     )
// }
// export default Select
// export { Option }

import React, { useEffect, useRef, useState, ReactNode } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { clsx } from '../../utils/clsx'

type SelectProps = {
  label?: string
  children: ReactNode
  onChange?: (event: { target: { value: string } }) => void
  value?: string // Controlled selected value
}

type OptionProps = {
  value: string
  children: ReactNode
}

const Select = ({ label = "Select an option", children, onChange, value }: SelectProps) => {
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ReactNode | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleSelect = (value: string, content: ReactNode) => {
    setSelectedItem(content)

    onChange?.({ target: { value } })

    setOpen(false)
  }

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (open && !selectRef?.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener("mousedown", closeDropdown)
    return () => window.removeEventListener("mousedown", closeDropdown)
  }, [open])

  useEffect(() => {
    if (value !== undefined) {
      const selectedOption = React.Children.toArray(children).find(
        (child) =>
          React.isValidElement(child) &&
          child.type === Option &&
          child.props.value === value
      )
      setSelectedItem(selectedOption?.props.children ?? null)
    }
  }, [children, value])

  return (
    <div className='relative min-w-[10rem]' ref={selectRef}>
      <button onClick={handleToggle} className={clsx('flex justify-between min-w-full border rounded-md items-center gap-x-3 p-2 cursor-pointer', open ? "ring-4 ring-gray-100/50" : "")}>
        <span className='text-sm'>{selectedItem || label}</span>
        <GoChevronDown className={clsx(open ? "rotate-180" : "rotate-0", "transition")} />
      </button>
      {(
        <div className={clsx('top-12 absolute w-full p-2 border rounded-md shadow-md flex flex-col gap-1 bg-white', open ? "scale-100 transition" : "scale-0")}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === Option) {
              return React.cloneElement(child, {
                onSelect: () => handleSelect(child.props.value, child.props.children)
              })
            }
            return child
          })}
        </div>
      )}
    </div>
  )
}

const Option = ({ value, children, onSelect }: OptionProps & { onSelect?: () => void }) => {
  return (
    <button
      onClick={onSelect}
      className='hover:bg-gray-100/90 transition rounded-md p-2 text-sm w-full text-left'>
      {children}
    </button>
  )
}

export default Select
export { Option }
