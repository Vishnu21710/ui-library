


import React, { useState, ReactNode, ReactElement } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { LuMinus } from 'react-icons/lu';


type AccordionProps = {
  children: ReactNode;
  usePlus?: boolean
};

type AccordionItemProps = {
  trigger: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  usePlus?: boolean
};

const AccordionItem = ({ trigger, children, isOpen, onToggle, usePlus }: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200">
      <div
        onClick={onToggle}
        className="flex  hover:underline underline-offset-2 justify-between items-center py-4 cursor-pointer text-black text-md   transition-all font-semibold"
      >
        {trigger}
        {!usePlus ? <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <IoIosArrowDown />
        </span> : <span className={``}>
          {isOpen ? <LuMinus /> : <GoPlus />}
        </span>}
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-3' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className='overflow-hidden'>
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ children, usePlus }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = React.Children.toArray(children).filter(
    (child): child is ReactElement<AccordionItemProps> =>
      React.isValidElement(child) && child.type === AccordionItem
  );

  return (
    <div className="w-full divide-y divide-gray-200">
      {items.map((item, index) =>
        React.cloneElement(item, {
          key: index,
          isOpen: openIndex === index,
          onToggle: () => setOpenIndex(openIndex === index ? null : index),
          usePlus: usePlus
        })
      )}
    </div>
  );
};

export { Accordion, AccordionItem };