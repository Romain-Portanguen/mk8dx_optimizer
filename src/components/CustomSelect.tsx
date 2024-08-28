import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface CustomSelectProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; } | string>;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  icon,
  value,
  onChange,
  options,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const displayValue = value
    ? options.find(opt => (typeof opt === 'string' ? opt : opt.value) === value)
    : null;

  return (
    <div className="relative" ref={selectRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <div
        className="relative w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <span className="block truncate">
            {displayValue
              ? (typeof displayValue === 'string' ? displayValue : displayValue.label)
              : <span className="text-gray-400">{placeholder}</span>
            }
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            return (
              <li
                key={optionValue}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white ${optionValue === value ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                  }`}
                onClick={() => handleSelect(optionValue)}
              >
                {optionLabel}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};