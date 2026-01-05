import React from 'react';

interface UrgencyBarProps {
  timer: string;
}

const UrgencyBar: React.FC<UrgencyBarProps> = ({ timer }) => {
  return (
    <div className="fixed top-0 w-full bg-brand-danger text-white text-xs md:text-sm font-bold text-center py-2 z-50 shadow-md flex justify-center items-center gap-2">
      <i className="ph-fill ph-warning-circle text-yellow-300 animate-pulse"></i>
      <span>ATENÇÃO: Desconto de lançamento encerra em breve.</span>
      <span className="font-mono bg-red-800 px-2 rounded ml-2">{timer}</span>
    </div>
  );
};

export default UrgencyBar;