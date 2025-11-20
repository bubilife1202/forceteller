'use client';

import { useState } from 'react';

interface TooltipProps {
  content: string;
}

export default function Tooltip({ content }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="ml-2 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-500 transition"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
      >
        ?
      </button>
      {show && (
        <div className="absolute left-0 top-8 z-50 w-72 p-4 bg-gray-900 text-white text-sm rounded-xl shadow-2xl">
          <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 transform rotate-45"></div>
          {content}
        </div>
      )}
    </div>
  );
}
